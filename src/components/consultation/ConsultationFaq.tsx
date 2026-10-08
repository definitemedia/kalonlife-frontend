"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { consultationFaqIds } from "@/config/consultation";
import { ChevronIcon } from "./icons";

export function ConsultationFaq() {
  const t = useTranslations("consultation");
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="consult-section consult-faq" aria-labelledby="consult-faq-heading">
      <div className="container">
        <p className="consult-eyebrow">{t("faq.eyebrow")}</p>
        <h2 id="consult-faq-heading" className="consult-title">
          {t("faq.heading")}
        </h2>
        <ul className="consult-faq-list">
          {consultationFaqIds.map((id) => {
            const open = openId === id;
            const buttonId = `${baseId}-${id}-button`;
            const panelId = `${baseId}-${id}-panel`;
            return (
              <li key={id} className="consult-faq-item">
                <h3>
                  <button
                    id={buttonId}
                    className="consult-faq-button"
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : id)}
                  >
                    <span>{t(`faq.items.${id}.question`)}</span>
                    <ChevronIcon />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                  <p className="consult-faq-panel">{t(`faq.items.${id}.answer`)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
