import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "./wellness-choices.css";

const lifestyleImage = "/images/wellness-choices-kitchen.png";

const actions = [
  { id: "products", href: "/shop", icon: "bag" },
  { id: "dietician", href: "/consult-your-dietician", icon: "person" },
  { id: "hub", href: "/wellness-hub/locate", icon: "pin" },
  { id: "articles", href: "/articles", icon: "document" },
] as const;

export async function WellnessChoicesSection() {
  const t = await getTranslations("choices");

  return (
    <section className="choices-band" aria-labelledby="choices-heading">
      <div className="choices-band-layout">
        <div className="choices-band-copy">
          <p className="choices-band-eyebrow">{t("eyebrow")}</p>
          <h2 className="choices-band-title" id="choices-heading">
            {t("heading")}
          </h2>
          <p className="choices-band-body">{t("body")}</p>
          <div className="choices-band-ctas">
            <Link className="choices-band-cta choices-band-cta-primary" href="/shop">
              {t("shopCta")}
              <ArrowIcon />
            </Link>
            <Link
              className="choices-band-cta choices-band-cta-secondary"
              href="/consult-your-dietician"
            >
              {t("consultCta")}
            </Link>
          </div>
        </div>

        <div className="choices-band-visual">
          <div className="choices-band-media">
            <Image
              className="choices-band-photo"
              src={lifestyleImage}
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1040px) 100vw, 58vw"
            />
          </div>
          <div className="choices-band-card">
            <p className="choices-band-kicker">{t("startLabel")}</p>
            <h3 className="choices-band-card-title" id="choices-card-title">
              {t("cardTitle")}
            </h3>
            <p className="choices-band-card-support">{t("cardSupport")}</p>
            <ul className="choices-band-actions">
              {actions.map((action) => (
                <li key={action.id}>
                  <Link
                    className="choices-band-action"
                    href={action.href}
                    aria-label={t(`actions.${action.id}Aria`)}
                  >
                    <span className="choices-band-action-icon">
                      <ActionIcon name={action.icon} />
                    </span>
                    <span className="choices-band-action-label">
                      {t(`actions.${action.id}`)}
                      <ArrowIcon />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg className="choices-band-arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h10M9.5 4.5 13 8l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActionIcon({ name }: { name: (typeof actions)[number]["icon"] }) {
  const props = {
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  if (name === "bag") {
    return (
      <svg {...props}>
        <path
          d="M6.5 8h11l-.8 11.2a1 1 0 0 1-1 .8H8.3a1 1 0 0 1-1-.8L6.5 8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 8V7.2A3 3 0 0 1 12 4a3 3 0 0 1 3 3.2V8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "person") {
    return (
      <svg {...props}>
        <circle
          cx="12"
          cy="8"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M5.8 19.2c1.1-3 3.2-4.5 6.2-4.5s5.1 1.5 6.2 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg {...props}>
        <path
          d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="11"
          r="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path
        d="M7 3.5h7.2L19 8.2V20.5H7V3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 3.5V8.2H19M9.2 12.5h5.6M9.2 16h5.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
