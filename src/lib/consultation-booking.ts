export const CONSULTATION_PACKAGE_ID = "single-consultation" as const;
export const CONSULTATION_AMOUNT = "999.00" as const;
export const CONSULTATION_CURRENCY = "INR" as const;

const GENDERS = ["female", "male", "unspecified"] as const;

export type ConsultationGender = (typeof GENDERS)[number];

export type ConsultationFormValues = {
  fullName: string;
  age: string;
  gender: string;
  mobile: string;
  email: string;
  preferredDate: string;
  healthConcern: string;
};

export type ConsultationField =
  | "fullName"
  | "age"
  | "gender"
  | "mobile"
  | "email"
  | "preferredDate"
  | "healthConcern";

export type ConsultationFieldErrors = Partial<Record<ConsultationField, ConsultationField>>;

export type ConsultationBookingPayload = {
  packageId: typeof CONSULTATION_PACKAGE_ID;
  amount: typeof CONSULTATION_AMOUNT;
  currency: typeof CONSULTATION_CURRENCY;
  fullName: string;
  age?: string;
  gender?: ConsultationGender;
  mobile: string;
  email?: string;
  preferredDate: string;
  healthConcern?: string;
};

export function indiaTodayIso(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function isGender(value: string): value is ConsultationGender {
  return GENDERS.some((gender) => gender === value);
}

function isRealIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day));
  return (
    utc.getUTCFullYear() === year &&
    utc.getUTCMonth() === month - 1 &&
    utc.getUTCDate() === day
  );
}

export function validateConsultationForm(
  values: ConsultationFormValues,
  today = indiaTodayIso(),
): ConsultationFieldErrors {
  const errors: ConsultationFieldErrors = {};
  const fullName = values.fullName.trim();
  if (!fullName || fullName.length > 120) errors.fullName = "fullName";

  const age = values.age.trim();
  if (age) {
    const parsed = Number(age);
    if (!/^\d{1,3}$/.test(age) || parsed < 1 || parsed > 120) errors.age = "age";
  }

  if (values.gender && !isGender(values.gender)) errors.gender = "gender";

  if (!/^[6-9]\d{9}$/.test(values.mobile.trim())) errors.mobile = "mobile";

  const email = values.email.trim();
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    errors.email = "email";
  }

  if (!isRealIsoDate(values.preferredDate) || values.preferredDate < today) {
    errors.preferredDate = "preferredDate";
  }

  if (values.healthConcern.trim().length > 2000) errors.healthConcern = "healthConcern";

  return errors;
}

export function parseConsultationBooking(input: unknown, today = indiaTodayIso()) {
  const source = input && typeof input === "object" ? (input as Partial<ConsultationFormValues>) : {};
  const values: ConsultationFormValues = {
    fullName: typeof source.fullName === "string" ? source.fullName : "",
    age: typeof source.age === "string" ? source.age : "",
    gender: typeof source.gender === "string" ? source.gender : "",
    mobile: typeof source.mobile === "string" ? source.mobile : "",
    email: typeof source.email === "string" ? source.email : "",
    preferredDate: typeof source.preferredDate === "string" ? source.preferredDate : "",
    healthConcern: typeof source.healthConcern === "string" ? source.healthConcern : "",
  };
  const fields = validateConsultationForm(values, today);
  if (Object.keys(fields).length > 0) return { ok: false as const, fields };

  const gender = values.gender && isGender(values.gender) ? values.gender : undefined;
  const payload: ConsultationBookingPayload = {
    packageId: CONSULTATION_PACKAGE_ID,
    amount: CONSULTATION_AMOUNT,
    currency: CONSULTATION_CURRENCY,
    fullName: values.fullName.trim(),
    mobile: values.mobile.trim(),
    preferredDate: values.preferredDate,
    ...(values.age.trim() ? { age: values.age.trim() } : {}),
    ...(gender ? { gender } : {}),
    ...(values.email.trim() ? { email: values.email.trim() } : {}),
    ...(values.healthConcern.trim() ? { healthConcern: values.healthConcern.trim() } : {}),
  };

  return { ok: true as const, payload };
}
