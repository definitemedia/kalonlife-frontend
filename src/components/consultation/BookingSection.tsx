import { getTranslations } from "next-intl/server";
import { ConsultationForm } from "./ConsultationForm";
import { LockIcon } from "./icons";

export async function BookingSection() {
  const t = await getTranslations("consultation");

  return (
    <section id="book-consultation" className="consult-section consult-booking" aria-labelledby="consult-booking-heading">
      <div className="container">
        <h2 id="consult-booking-heading" className="consult-title">
          {t("booking.heading")}
        </h2>
        <p className="consult-lead">{t("booking.description")}</p>
        <div className="consult-book-grid">
          <aside className="consult-summary" aria-label={t("aria.summary")}>
            <p className="consult-summary-kicker">{t("booking.summaryEyebrow")}</p>
            <h3>{t("booking.packageName")}</h3>
            <p className="consult-summary-price">{t("booking.price")}</p>
            <p>{t("booking.packageDetail")}</p>
            <p className="consult-summary-secure">
              <LockIcon />
              <span>{t("booking.secure")}</span>
            </p>
          </aside>
          <ConsultationForm />
        </div>
        <p className="consult-disclaimer">{t("disclaimer")}</p>
      </div>
    </section>
  );
}
