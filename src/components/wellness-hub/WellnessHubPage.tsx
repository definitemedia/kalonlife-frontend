import "./wellness-hub.css";
import { HubAbout } from "./HubAbout";
import { HubFaq } from "./HubFaq";
import { HubFinalCta } from "./HubFinalCta";
import { HubHero } from "./HubHero";
import { HubPersonal } from "./HubPersonal";
import { HubPricing } from "./HubPricing";
import { HubServices } from "./HubServices";
import { HubSteps } from "./HubSteps";
import { HubTools } from "./HubTools";
import { HubWhy } from "./HubWhy";

export function WellnessHubPage() {
  return (
    <div className="wh-page">
      <HubHero />
      <HubAbout />
      <HubServices />
      <HubPersonal />
      <HubSteps />
      <HubTools />
      <HubWhy />
      <HubPricing />
      <HubFaq />
      <HubFinalCta />
    </div>
  );
}
