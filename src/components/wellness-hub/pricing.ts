import { getRoute } from "@/config/routes";
import { CONSULTATION_AMOUNT } from "@/lib/consultation-booking";

const rupees = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Whole-rupee label for the single consultation, e.g. "₹999". */
export const consultationPrice = `₹${rupees.format(Number(CONSULTATION_AMOUNT))}`;

export const consultationHref = getRoute("consultDietician").path;

export const servicesAnchor = "wellness-services";
