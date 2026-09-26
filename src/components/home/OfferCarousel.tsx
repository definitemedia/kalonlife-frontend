"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import {
  ActivityIcon,
  AppleIcon,
  GlassWaterIcon,
  PillIcon,
  SparklesIcon,
  SproutIcon,
} from "@/components/icons/OfferIcons";

const icons = {
  pill: PillIcon,
  glass: GlassWaterIcon,
  sprout: SproutIcon,
  sparkles: SparklesIcon,
  activity: ActivityIcon,
  apple: AppleIcon,
} as const;

export type OfferIconName = keyof typeof icons;

export type OfferItem = {
  id: string;
  title: string;
  description: string;
  imageAlt: string;
  src: string;
  icon: OfferIconName;
};

type OfferCarouselProps = {
  items: OfferItem[];
  carouselLabel: string;
  previousLabel: string;
  nextLabel: string;
};

export function OfferCarousel({
  items,
  carouselLabel,
  previousLabel,
  nextLabel,
}: OfferCarouselProps) {
  const trackId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const syncEnds = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    syncEnds();
    window.addEventListener("resize", syncEnds);
    return () => window.removeEventListener("resize", syncEnds);
  }, [syncEnds]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-offer-card]");
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = card.getBoundingClientRect().width + gap;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * distance,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const advance = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-offer-card]");
    if (!track || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduce ? "auto" : "smooth";
    const max = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= max - 4) {
      track.scrollTo({ left: 0, behavior });
      return;
    }
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = card.getBoundingClientRect().width + gap;
    track.scrollBy({ left: distance, behavior });
  }, []);

  useEffect(() => {
    if (reduceMotion || held) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      advance();
    }, 4500);
    return () => window.clearInterval(id);
  }, [advance, held, reduceMotion]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  };

  return (
    <div
      className="offer-panel"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          setHeld(false);
        }
      }}
    >
      <div className="offer-controls">
        <button
          type="button"
          className="offer-nav"
          aria-label={previousLabel}
          aria-controls={trackId}
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
        >
          <Chevron direction="left" />
        </button>
        <button
          type="button"
          className="offer-nav"
          aria-label={nextLabel}
          aria-controls={trackId}
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
        >
          <Chevron direction="right" />
        </button>
      </div>
      <div
        id={trackId}
        ref={trackRef}
        className="offer-track"
        role="region"
        aria-roledescription="carousel"
        aria-label={carouselLabel}
        tabIndex={0}
        onScroll={syncEnds}
        onKeyDown={onKeyDown}
      >
        {items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <article key={item.id} className="offer-card" data-offer-card>
              <Image
                src={item.src}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 18vw"
              />
              <div className="offer-shade" aria-hidden="true" />
              <div className="offer-card-copy">
                <div className="offer-icon-plate">
                  <Icon className="offer-icon" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d={direction === "left" ? "M14.5 6.5 9 12l5.5 5.5" : "M9.5 6.5 15 12l-5.5 5.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
