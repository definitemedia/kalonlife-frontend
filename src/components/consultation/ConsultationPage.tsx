import "./consultation.css";
import { Benefits } from "./Benefits";
import { BookingSection } from "./BookingSection";
import { ConsultationFaq } from "./ConsultationFaq";
import { ConsultationHero } from "./ConsultationHero";
import { HowItWorks } from "./HowItWorks";
import { PrimaryCta } from "./PrimaryCta";
import { QuestionsFirst } from "./QuestionsFirst";
import { StepRecap } from "./StepRecap";
import { Testimonials } from "./Testimonials";
import { TrustIndicators } from "./TrustIndicators";
import { TrustStrip } from "./TrustStrip";

export function ConsultationPage() {
  return (
    <div className="consult-page">
      <ConsultationHero />
      <TrustIndicators />
      <HowItWorks />
      <TrustStrip />
      <PrimaryCta />
      <Benefits />
      <StepRecap />
      <QuestionsFirst />
      <BookingSection />
      <Testimonials />
      <ConsultationFaq />
    </div>
  );
}
