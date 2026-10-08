"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  indiaTodayIso,
  validateConsultationForm,
  type ConsultationField,
  type ConsultationFieldErrors,
  type ConsultationFormValues,
} from "@/lib/consultation-booking";
import { startConsultationCheckout } from "@/lib/consultation-checkout";

const emptyValues: ConsultationFormValues = {
  fullName: "",
  age: "",
  gender: "",
  mobile: "",
  email: "",
  preferredDate: "",
  healthConcern: "",
};

const fieldOrder: ConsultationField[] = [
  "fullName",
  "age",
  "gender",
  "mobile",
  "email",
  "preferredDate",
  "healthConcern",
];

export function ConsultationForm() {
  const t = useTranslations("consultation");
  const baseId = useId();
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [values, setValues] = useState<ConsultationFormValues>(emptyValues);
  const [errors, setErrors] = useState<ConsultationFieldErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<"notConnected" | "unavailable" | null>(null);
  const [pending, setPending] = useState(false);
  const today = indiaTodayIso();

  useEffect(() => {
    if (status) statusRef.current?.focus();
  }, [status]);

  function update(field: keyof ConsultationFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setStatus(null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const nextErrors = validateConsultationForm(values, today);
    setErrors(nextErrors);
    setStatus(null);

    if (Object.keys(nextErrors).length > 0) {
      setShowSummary(true);
      const first = fieldOrder.find((field) => nextErrors[field]);
      if (first) document.getElementById(fieldId(baseId, first))?.focus();
      return;
    }

    setShowSummary(false);
    setPending(true);
    let leavePending = false;
    try {
      const result = await startConsultationCheckout(values);
      if (result.status === "redirect") {
        leavePending = true;
        window.location.assign(result.checkoutUrl);
        return;
      }
      if (result.status === "invalid") {
        setErrors(result.fields);
        setShowSummary(true);
        const first = fieldOrder.find((field) => result.fields[field]);
        if (first) document.getElementById(fieldId(baseId, first))?.focus();
        return;
      }
      setStatus(result.status === "not_configured" ? "notConnected" : "unavailable");
    } catch {
      setStatus("unavailable");
    } finally {
      if (!leavePending) setPending(false);
    }
  }

  return (
    <div className="consult-form-card">
      <form className="consult-form" method="post" noValidate onSubmit={onSubmit} aria-label={t("aria.bookForm")}>
        {showSummary ? (
          <p className="consult-error" role="alert">
            {t("form.errors.summary")}
          </p>
        ) : null}

        <Field
          id={fieldId(baseId, "fullName")}
          label={t("form.fullName")}
          flag={t("form.required")}
          error={errors.fullName ? t("form.errors.fullName") : undefined}
        >
          <input
            id={fieldId(baseId, "fullName")}
            className="consult-input"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            placeholder={t("form.fullNamePlaceholder")}
            value={values.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? errorId(baseId, "fullName") : undefined}
            onChange={(event) => update("fullName", event.target.value)}
          />
        </Field>

        <Field
          id={fieldId(baseId, "age")}
          label={t("form.age")}
          flag={t("form.optional")}
          error={errors.age ? t("form.errors.age") : undefined}
        >
          <input
            id={fieldId(baseId, "age")}
            className="consult-input"
            name="age"
            type="text"
            inputMode="numeric"
            value={values.age}
            aria-invalid={Boolean(errors.age)}
            aria-describedby={errors.age ? errorId(baseId, "age") : undefined}
            onChange={(event) => update("age", event.target.value)}
          />
        </Field>

        <Field
          id={fieldId(baseId, "gender")}
          label={t("form.gender")}
          flag={t("form.optional")}
          error={errors.gender ? t("form.errors.gender") : undefined}
        >
          <select
            id={fieldId(baseId, "gender")}
            className="consult-select"
            name="gender"
            value={values.gender}
            aria-invalid={Boolean(errors.gender)}
            aria-describedby={errors.gender ? errorId(baseId, "gender") : undefined}
            onChange={(event) => update("gender", event.target.value)}
          >
            <option value="">{t("form.genderPlaceholder")}</option>
            <option value="female">{t("form.genderFemale")}</option>
            <option value="male">{t("form.genderMale")}</option>
            <option value="unspecified">{t("form.genderUnspecified")}</option>
          </select>
        </Field>

        <Field
          id={fieldId(baseId, "mobile")}
          label={t("form.mobile")}
          flag={t("form.required")}
          error={errors.mobile ? t("form.errors.mobile") : undefined}
        >
          <input
            id={fieldId(baseId, "mobile")}
            className="consult-input"
            name="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
            maxLength={10}
            placeholder={t("form.mobilePlaceholder")}
            value={values.mobile}
            aria-invalid={Boolean(errors.mobile)}
            aria-describedby={errors.mobile ? errorId(baseId, "mobile") : undefined}
            onChange={(event) => update("mobile", event.target.value)}
          />
        </Field>

        <Field
          id={fieldId(baseId, "email")}
          label={t("form.email")}
          flag={t("form.optional")}
          error={errors.email ? t("form.errors.email") : undefined}
        >
          <input
            id={fieldId(baseId, "email")}
            className="consult-input"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId(baseId, "email") : undefined}
            onChange={(event) => update("email", event.target.value)}
          />
        </Field>

        <Field
          id={fieldId(baseId, "preferredDate")}
          label={t("form.date")}
          flag={t("form.required")}
          hint={t("form.datePlaceholder")}
          error={errors.preferredDate ? t("form.errors.preferredDate") : undefined}
        >
          <input
            id={fieldId(baseId, "preferredDate")}
            className="consult-input"
            name="preferredDate"
            type="date"
            required
            min={today}
            placeholder={t("form.datePlaceholder")}
            value={values.preferredDate}
            aria-invalid={Boolean(errors.preferredDate)}
            aria-describedby={
              errors.preferredDate
                ? errorId(baseId, "preferredDate")
                : hintId(baseId, "preferredDate")
            }
            onChange={(event) => update("preferredDate", event.target.value)}
          />
        </Field>

        <Field
          id={fieldId(baseId, "healthConcern")}
          label={t("form.concern")}
          flag={t("form.optional")}
          error={errors.healthConcern ? t("form.errors.healthConcern") : undefined}
        >
          <textarea
            id={fieldId(baseId, "healthConcern")}
            className="consult-textarea"
            name="healthConcern"
            rows={5}
            maxLength={2000}
            placeholder={t("form.concernPlaceholder")}
            value={values.healthConcern}
            aria-invalid={Boolean(errors.healthConcern)}
            aria-describedby={errors.healthConcern ? errorId(baseId, "healthConcern") : undefined}
            onChange={(event) => update("healthConcern", event.target.value)}
          />
        </Field>

        <button className="consult-btn consult-btn-primary consult-submit" type="submit" disabled={pending} aria-busy={pending}>
          {t("form.submit")}
        </button>
        <p className="consult-pay-support">{t("form.paySupport")}</p>

        {pending || status ? (
          <p ref={statusRef} tabIndex={-1} role="status" className="consult-status">
            {status ? t(`form.status.${status}`) : t("form.status.submitting")}
          </p>
        ) : null}
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  flag,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  flag: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="consult-field">
      <label className="consult-label" htmlFor={id}>
        {label}
        <span className="consult-flag">{flag}</span>
      </label>
      {children}
      {hint && !error ? (
        <p id={hintIdFromField(id)} className="consult-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorIdFromField(id)} className="consult-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function fieldId(baseId: string, field: ConsultationField) {
  return `${baseId}-${field}`;
}

function errorId(baseId: string, field: ConsultationField) {
  return `${baseId}-${field}-error`;
}

function hintId(baseId: string, field: ConsultationField) {
  return `${baseId}-${field}-hint`;
}

function errorIdFromField(id: string) {
  return `${id}-error`;
}

function hintIdFromField(id: string) {
  return `${id}-hint`;
}
