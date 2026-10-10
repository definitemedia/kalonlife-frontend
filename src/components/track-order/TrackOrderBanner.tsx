import Image from "next/image";
import { TrackOrderCta } from "./TrackOrderCta";

type TrackOrderBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  appBadge: string;
  phoneAlt: string;
};

export function TrackOrderBanner({
  eyebrow,
  title,
  description,
  cta,
  appBadge,
  phoneAlt,
}: TrackOrderBannerProps) {
  return (
    <section className="track-banner-band" aria-labelledby="track-banner-title">
      <div className="container">
        <div className="track-banner">
          <div className="track-phone">
            <div className="track-phone-screen">
              <Image
                src="/images/track-order/kalonlife-shop-mobile.webp"
                alt={phoneAlt}
                width={600}
                height={1298}
                sizes="(max-width: 767px) 190px, 200px"
                preload
                className="track-phone-image"
              />
            </div>
          </div>
          <div className="track-banner-copy">
            <p className="track-banner-eyebrow">{eyebrow}</p>
            <h1 id="track-banner-title" className="track-banner-title">
              {title}
            </h1>
            <p className="track-banner-description">{description}</p>
          </div>
          <div className="track-banner-actions">
            <TrackOrderCta label={cta} />
            <p className="track-banner-badge">
              <span className="track-banner-badge-dot" aria-hidden="true" />
              {appBadge}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
