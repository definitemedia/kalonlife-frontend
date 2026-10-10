export type TrackOrderField = "orderId" | "phone";

export type TrackOrderErrorCode =
  | "orderIdRequired"
  | "orderIdInvalid"
  | "phoneRequired"
  | "phoneInvalid";

export type TrackOrderErrors = Partial<Record<TrackOrderField, TrackOrderErrorCode>>;

export type TrackOrderRequest = {
  orderId: string;
  /** Ten-digit Indian mobile number without country code. */
  phone: string;
};

const ORDER_ID_PATTERN = /^[A-Za-z0-9#/_-]{3,40}$/;
const INDIAN_MOBILE_PATTERN = /^(?:\+91|0)?([6-9]\d{9})$/;

export function normalizeIndianMobile(value: string): string | null {
  const compact = value.replace(/[\s().-]/g, "");
  const match = INDIAN_MOBILE_PATTERN.exec(compact);
  return match ? match[1] : null;
}

export function validateTrackOrder(values: Record<TrackOrderField, string>): {
  errors: TrackOrderErrors;
  request: TrackOrderRequest | null;
} {
  const errors: TrackOrderErrors = {};
  const orderId = values.orderId.trim();
  const phoneInput = values.phone.trim();

  if (!orderId) errors.orderId = "orderIdRequired";
  else if (!ORDER_ID_PATTERN.test(orderId)) errors.orderId = "orderIdInvalid";

  const phone = phoneInput ? normalizeIndianMobile(phoneInput) : null;
  if (!phoneInput) errors.phone = "phoneRequired";
  else if (!phone) errors.phone = "phoneInvalid";

  if (errors.orderId || errors.phone || !phone) return { errors, request: null };
  return { errors, request: { orderId, phone } };
}
