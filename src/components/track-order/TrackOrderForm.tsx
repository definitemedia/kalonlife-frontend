"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  validateTrackOrder,
  type TrackOrderErrors,
  type TrackOrderField,
  type TrackOrderRequest,
} from "@/lib/order-tracking";
import { TRACK_ORDER_FORM_ID, TRACK_ORDER_INPUT_ID } from "./ids";

const PHONE_INPUT_ID = "track-order-phone";
const HEADING_ID = "track-order-heading";

const fieldInputIds: Record<TrackOrderField, string> = {
  orderId: TRACK_ORDER_INPUT_ID,
  phone: PHONE_INPUT_ID,
};

export function TrackOrderForm() {
  const t = useTranslations("trackOrder");
  const [values, setValues] = useState<Record<TrackOrderField, string>>({ orderId: "", phone: "" });
  const [errors, setErrors] = useState<TrackOrderErrors>({});
  const [pendingRequest, setPendingRequest] = useState<TrackOrderRequest | null>(null);

  function update(field: TrackOrderField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setPendingRequest(null);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateTrackOrder(values);
    setErrors(result.errors);

    if (!result.request) {
      setPendingRequest(null);
      const first = (["orderId", "phone"] as const).find((field) => result.errors[field]);
      if (first) document.getElementById(fieldInputIds[first])?.focus();
      return;
    }

    // Online tracking has no backend yet; route the validated request to support.
    setPendingRequest(result.request);
  }

  return (
    <section
      id={TRACK_ORDER_FORM_ID}
      className="track-form-section"
      aria-labelledby={HEADING_ID}
    >
      <div className="track-form-inner">
        <h2 id={HEADING_ID} className="track-form-heading">
          {t("form.heading")}
        </h2>
        <p className="track-form-description">{t("form.description")}</p>

        <form className="track-form" method="post" noValidate onSubmit={onSubmit}>
          <div className="track-form-fields">
            <Field
              id={TRACK_ORDER_INPUT_ID}
              label={t("form.orderId")}
              error={errors.orderId ? t(`form.errors.${errors.orderId}`) : undefined}
            >
              <input
                id={TRACK_ORDER_INPUT_ID}
                className="track-input"
                name="orderId"
                type="text"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                maxLength={40}
                required
                placeholder={t("form.orderId")}
                value={values.orderId}
                aria-invalid={Boolean(errors.orderId)}
                aria-describedby={errors.orderId ? `${TRACK_ORDER_INPUT_ID}-error` : undefined}
                onChange={(event) => update("orderId", event.target.value)}
              />
            </Field>

            <Field
              id={PHONE_INPUT_ID}
              label={t("form.phone")}
              error={errors.phone ? t(`form.errors.${errors.phone}`) : undefined}
            >
              <input
                id={PHONE_INPUT_ID}
                className="track-input"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={16}
                required
                placeholder={t("form.phone")}
                value={values.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${PHONE_INPUT_ID}-error` : undefined}
                onChange={(event) => update("phone", event.target.value)}
              />
            </Field>
          </div>

          <button className="track-submit" type="submit">
            {t("form.submit")}
          </button>
        </form>

        <div className="track-notice-region" aria-live="polite" role="status">
          {pendingRequest ? (
            <div className="track-notice">
              <p className="track-notice-text">
                {t("form.notice", { orderId: pendingRequest.orderId })}
              </p>
              <Link href="/contact" className="track-notice-link">
                {t("contactCta")}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="track-field">
      <label className="track-label" htmlFor={id}>
        {label}
        <span className="track-required" aria-hidden="true">
          *
        </span>
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="track-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
