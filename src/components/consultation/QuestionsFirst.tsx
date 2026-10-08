import { getTranslations } from "next-intl/server";
import { consultationContact } from "@/config/consultation";
import { MailIcon, PhoneIcon } from "./icons";

export async function QuestionsFirst() {
  const t = await getTranslations("consultation");

  return (
    <section className="consult-section consult-questions" aria-labelledby="consult-questions-heading">
      <div className="container">
        <h2 id="consult-questions-heading" className="consult-title">
          {t("questions.heading")}
        </h2>
        <p className="consult-lead">{t("questions.description")}</p>
        <ul className="consult-contact-list">
          <li>
            <a href={consultationContact.phoneHref}>
              <PhoneIcon />
              <span>{t("questions.phone")}</span>
            </a>
          </li>
          <li>
            <a href={consultationContact.emailHref}>
              <MailIcon />
              <span>{t("questions.email")}</span>
            </a>
          </li>
        </ul>
        <div className="consult-actions">
          <a className="consult-btn consult-btn-primary" href="#book-consultation">
            {t("questions.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
