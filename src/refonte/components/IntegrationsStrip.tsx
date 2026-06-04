/* IntegrationsStrip, V2 cinematic
 *   - InfiniteSlider horizontal des 15 intégrations marché FR
 *   - ProgressiveBlur fade gauche/droite
 *   - Sparkles ambient orange charte GND (warm only)
 *   - Radial gradient orange centre-bas
 *   - Background cream + dark walnut showcase pour signature premium
 */
import * as React from 'react';
import { Section, Container } from '../ui';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { Sparkles } from '@/components/ui/sparkles';

// 20 intégrations couvrant les verticales réelles du Pipeline Prospects GND :
// restauration · salon coiffure · plombier/électricien/serrurier · artisan bâtiment ·
// commerce proximité · boulangerie · santé · sport/coach · immobilier · événementiel ·
// audiovisuel · communication
const INTEGRATIONS = [
  // Universels (toutes verticales)
  'Stripe',
  'Apple Pay',
  'Google Business',
  'Calendly',
  'WhatsApp Business',
  'Brevo',
  'Plausible',
  'Instagram',
  // Restauration / Brunch / Boulangerie
  'Zenchef',
  'TheFork',
  'Uber Eats',
  'Deliveroo',
  'Sunday',
  'TripAdvisor',
  // Salon coiffure / Instituts beauté
  'Planity',
  'Treatwell',
  'Booksy',
  // Artisans BTP
  'Habitatpresto',
  // Santé
  'Doctolib',
  // Événementiel
  'Weezevent',
];

export function IntegrationsStrip() {
  return (
    <Section className="py-20 md:py-28 relative overflow-hidden" bg="alt">
      <Container>
        <div className="relative z-10 text-center">
          <div className="label-mono text-[11px] tracking-[0.22em] text-text-muted mb-5">
           VOS OUTILS, CONNECTÉS
          </div>
          <h2 className="display text-4xl md:text-6xl text-text-strong leading-tight max-w-3xl mx-auto">
            Votre site se branche aux outils qui font tourner{' '}
            <span className="italic text-accent">votre activité</span>.
          </h2>
          <p className="mt-5 text-text text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Réservation, paiement, livraison, analytics, avis, les briques que
            vous utilisez déjà se connectent à votre site GND. Sans abonnement
            caché.
          </p>
        </div>

        {/* Infinite slider with progressive blur sides */}
        <div className="relative mt-14 md:mt-16 h-[80px] md:h-[100px] w-full z-10">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={42}
            gap={56}
          >
            {INTEGRATIONS.map((name) => (
              <div
                key={name}
                className="display text-text-strong text-2xl md:text-3xl lg:text-4xl tracking-tight whitespace-nowrap opacity-80 hover:opacity-100 hover:text-accent transition-all"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
              >
                {name}
              </div>
            ))}
          </InfiniteSlider>
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[120px] md:w-[180px]"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[120px] md:w-[180px]"
            direction="right"
            blurIntensity={1}
          />
        </div>

        <p className="mt-10 text-center text-text-muted text-xs md:text-sm relative z-10">
          + Schema.org Restaurant complet · Wero (NFC souverain EU, automne
          2026) · sur demande : autres connecteurs
        </p>
      </Container>

      {/* Bottom signature, radial gradient + sparkles */}
      <div className="relative -mt-10 md:-mt-14 h-72 md:h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] pointer-events-none">
        <div
          className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#FF954F,transparent_70%)] before:opacity-50"
        />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-text-strong/15 bg-bg-alt" />
        <Sparkles
          density={900}
          size={1.4}
          color="#FF954F"
          opacity={0.9}
          opacitySpeed={2.5}
          speed={0.6}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
    </Section>
  );
}
