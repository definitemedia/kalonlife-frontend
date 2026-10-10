"use client";

import type { MouseEvent } from "react";
import { TRACK_ORDER_FORM_ID, TRACK_ORDER_INPUT_ID } from "./ids";

export function TrackOrderCta({ label }: { label: string }) {
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    const section = document.getElementById(TRACK_ORDER_FORM_ID);
    const input = document.getElementById(TRACK_ORDER_INPUT_ID);
    if (!section || !(input instanceof HTMLInputElement)) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    input.focus({ preventScroll: true });
  }

  return (
    <a className="track-banner-cta" href={`#${TRACK_ORDER_FORM_ID}`} onClick={onClick}>
      {label}
      <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          d="M10 4v12m0 0-5-5m5 5 5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
