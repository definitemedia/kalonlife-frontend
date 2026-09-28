"use client";

import { useId, useState } from "react";
import { useIsMobile } from "@/lib/overlay";

type FooterAccordionProps = {
  title: string;
  children: React.ReactNode;
};

export function FooterAccordion({ title, children }: FooterAccordionProps) {
  const [open, setOpen] = useState(false);
  const mobile = useIsMobile();
  const panelId = useId();
  const collapsed = mobile && !open;

  return (
    <nav className="footer-acc" aria-label={title}>
      <h2 className="footer-acc-heading">{title}</h2>
      <button
        type="button"
        className="footer-acc-toggle"
        aria-expanded={mobile ? open : true}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{title}</span>
        <Chevron open={open} />
      </button>
      <div
        id={panelId}
        className="footer-acc-panel"
        data-open={open ? "true" : "false"}
        inert={collapsed ? true : undefined}
      >
        <div className="footer-acc-panel-inner">{children}</div>
      </div>
    </nav>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={open ? "footer-acc-chevron is-open" : "footer-acc-chevron"}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.25 6.1 8 10.85 12.75 6.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
