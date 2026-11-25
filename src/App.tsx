import { useEffect, useRef, useState } from 'react';
import { LayoutGroup } from 'motion/react';
import type Lenis from 'lenis';
import { IntroCurtain } from './components/IntroCurtain';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KineticMarquee } from './components/KineticMarquee';
import { StorySection } from './components/StorySection';
import { EquipmentRail } from './components/EquipmentRail';
import { AboutSection } from './components/AboutSection';
import { PackagesSection } from './components/PackagesSection';
import { LocationSection } from './components/LocationSection';
import { EnquirySection } from './components/EnquirySection';
import { Footer } from './components/Footer';
import { useLenisScroll } from './hooks/useLenisScroll';
import {
  MARQUEE_ENERGY,
  MARQUEE_EQUIPMENT,
  MARQUEE_HERO,
  formatPackageLabel,
  type PlanTier,
} from './data/gymData';

// Intro storyboard timing (ms): centered logo holds briefly, then glides to navbar as curtain lifts
const INTRO_HOLD_MS = 680;

export default function App() {
  useLenisScroll();

  const [introActive, setIntroActive] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!introActive) return;
    const timer = window.setTimeout(() => setIntroActive(false), INTRO_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [introActive]);

  const [withPT, setWithPT] = useState(false);
  const [selectedPackageLabel, setSelectedPackageLabel] = useState<string>(
    formatPackageLabel('Quarterly', false)
  );
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectPlan = (tier: PlanTier, ptEnabled: boolean) => {
    setSelectedPackageLabel(formatPackageLabel(tier, ptEnabled));
    const el = document.getElementById('enquiry');
    if (el) {
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -72 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      window.setTimeout(() => {
        nameInputRef.current?.focus({ preventScroll: true });
      }, 500);
    }
  };

  return (
    <LayoutGroup>
      <div className="min-h-screen w-full">
        <IntroCurtain active={introActive} />
        <div className="scroll-progress" aria-hidden="true" />
        <Navbar showLogo={!introActive} />
        <main id="top">
          <Hero />
          <KineticMarquee primaryItems={MARQUEE_HERO} variant="amber-ribbon" />
          <StorySection />
          <EquipmentRail />
          <AboutSection />
          <KineticMarquee
            primaryItems={MARQUEE_EQUIPMENT}
            secondaryItems={MARQUEE_ENERGY}
            variant="tilted-dual"
          />
          <PackagesSection
            withPT={withPT}
            onTogglePT={setWithPT}
            onSelectPlan={handleSelectPlan}
          />
          <LocationSection />
          <EnquirySection
            selectedPackageLabel={selectedPackageLabel}
            onPackageChange={setSelectedPackageLabel}
            nameInputRef={nameInputRef}
          />
        </main>
        <Footer />
      </div>
    </LayoutGroup>
  );
}
