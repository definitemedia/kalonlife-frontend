import { getTranslations } from "next-intl/server";
import { BadgeIcon, CardIcon, LockIcon } from "./icons";

const items = [
  { id: "private", Icon: LockIcon },
  { id: "certified", Icon: BadgeIcon },
  { id: "payu", Icon: CardIcon },
] as const;

export async function TrustStrip() {
  const t = await getTranslations("consultation");

  return (
    <section className="consult-strip" aria-label={t("aria.trustStrip")}>
      <ul className="container consult-strip-list">
        {items.map(({ id, Icon }) => (
          <li key={id}>
            <Icon />
            <span>{t(`strip.${id}`)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
