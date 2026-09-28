import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "./wellness-goals.css";

/**
 * No category routes exist for these wellness goals.
 * Placeholder hrefs stay on the existing shop page so the build does not 404:
 * /shop?goal=daily-nutrition
 * /shop?goal=digestive-wellness
 * /shop?goal=active-lifestyle
 * /shop?goal=healthy-foods
 */
const goals = [
  {
    id: "dailyNutrition",
    href: "/shop?goal=daily-nutrition",
    src: "/images/wellness-goals/daily-nutrition.png",
    icon: "sun",
  },
  {
    id: "digestive",
    href: "/shop?goal=digestive-wellness",
    src: "/images/wellness-goals/digestive-wellness.png",
    icon: "leaf",
  },
  {
    id: "active",
    href: "/shop?goal=active-lifestyle",
    src: "/images/wellness-goals/active-lifestyle.png",
    icon: "heart",
  },
  {
    id: "foods",
    href: "/shop?goal=healthy-foods",
    src: "/images/wellness-goals/healthy-foods.png",
    icon: "seed",
  },
] as const;

export async function ShopByWellnessGoalSection() {
  const t = await getTranslations("goals");

  return (
    <section className="goals" aria-labelledby="goals-heading">
      <div className="container goals-layout">
        <header className="goals-header">
          <h2 className="goals-title" id="goals-heading">
            {t("heading")}
          </h2>
          <p className="goals-lead">{t("description")}</p>
        </header>
        <ul className="goals-grid">
          {goals.map((goal) => (
            <li key={goal.id}>
              <Link className="goals-card" href={goal.href}>
                <span className="goals-media">
                  <Image
                    className="goals-photo"
                    src={goal.src}
                    alt={t(`${goal.id}.imageAlt`)}
                    fill
                    sizes="(max-width: 960px) 50vw, 25vw"
                  />
                </span>
                <span className="goals-pill">{t(`${goal.id}.pill`)}</span>
                <span className="goals-caption">
                  <h3 className="goals-card-title">{t(`${goal.id}.title`)}</h3>
                  <p className="goals-card-copy">
                    <GoalIcon name={goal.icon} />
                    <span>{t(`${goal.id}.description`)}</span>
                  </p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GoalIcon({ name }: { name: (typeof goals)[number]["icon"] }) {
  const props = {
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  if (name === "sun") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 3.2v2.2M12 18.6v2.2M3.2 12h2.2M18.6 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "leaf") {
    return (
      <svg {...props}>
        <path
          d="M5 19s1.2-7.2 7.4-11.2C16.8 5.2 19.5 4.6 19.5 4.6S19 7.4 16.4 11.2C13.2 15.8 5 19 5 19Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 13.6c1.6-1.5 3.4-2.6 5.6-3.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "heart") {
    return (
      <svg {...props}>
        <path
          d="M12 19.2c-.3-.2-6.4-3.9-6.4-8.3A3.5 3.5 0 0 1 12 8.3a3.5 3.5 0 0 1 6.4 2.6c0 4.4-6.1 8.1-6.4 8.3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <circle cx="8" cy="9" r="1.6" fill="currentColor" />
      <circle cx="14.5" cy="7.5" r="1.35" fill="currentColor" />
      <circle cx="16.2" cy="13.2" r="1.7" fill="currentColor" />
      <circle cx="10.2" cy="15.4" r="1.45" fill="currentColor" />
    </svg>
  );
}
