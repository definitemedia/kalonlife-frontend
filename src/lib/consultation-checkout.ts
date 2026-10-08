"use server";

import {
  parseConsultationBooking,
  type ConsultationFieldErrors,
  type ConsultationFormValues,
} from "@/lib/consultation-booking";

export type ConsultationCheckoutResult =
  | { status: "not_configured" }
  | { status: "invalid"; fields: ConsultationFieldErrors }
  | { status: "unavailable" }
  | { status: "redirect"; checkoutUrl: string };

/**
 * Intended flow, owned by the Kalonlife backend — not this file:
 * Frontend → backend create booking → create PayU payment → PayU checkout
 * → server verification → confirmation → email/WhatsApp.
 *
 * Set CONSULTATION_BOOKING_URL to that backend endpoint. This function POSTs
 * the single ₹999.00 consultation only. PayU keys, hashes, and payment
 * verification stay on the server. This function never confirms payment.
 */
export async function startConsultationCheckout(
  input: ConsultationFormValues,
): Promise<ConsultationCheckoutResult> {
  const parsed = parseConsultationBooking(input);
  if (!parsed.ok) return { status: "invalid", fields: parsed.fields };

  const endpoint = process.env.CONSULTATION_BOOKING_URL?.trim();
  if (!endpoint) return { status: "not_configured" };

  let bookingUrl: URL;
  try {
    bookingUrl = new URL(endpoint);
  } catch {
    return { status: "not_configured" };
  }
  if (bookingUrl.protocol !== "https:" && bookingUrl.protocol !== "http:") {
    return { status: "not_configured" };
  }

  try {
    const response = await fetch(bookingUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(parsed.payload),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return { status: "unavailable" };

    const body = (await response.json()) as { checkoutUrl?: unknown };
    if (!isCheckoutUrl(body.checkoutUrl)) return { status: "unavailable" };
    return { status: "redirect", checkoutUrl: body.checkoutUrl };
  } catch {
    return { status: "unavailable" };
  }
}

function isCheckoutUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length === 0 || value.length > 2000) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
