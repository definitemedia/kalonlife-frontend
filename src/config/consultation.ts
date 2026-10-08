/** Visible strings stay in messages/consultation. This module only names the keys. */

export const consultationContact = {
  phoneHref: "tel:+918977723492",
  emailHref: "mailto:care@mykalonlife.com",
} as const;

export const consultationStepIds = ["details", "slot", "meet", "plan"] as const;

export const consultationRecapIds = ["details", "slot", "meet"] as const;

export const consultationBenefitIds = ["plans", "guidance", "flexible", "holistic"] as const;

export const consultationFeatureKeys = ["f1", "f2", "f3"] as const;

export const consultationTestimonials = [
  { id: "ananya" },
  { id: "rahul" },
  { id: "sneha" },
] as const;

export const consultationFaqIds = ["length", "privacy", "after", "reschedule"] as const;

export const consultationHighlightIds = [
  "available",
  "rating",
  "private",
  "certified",
  "members",
] as const;
