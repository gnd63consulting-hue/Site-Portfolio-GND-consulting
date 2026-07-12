/* ProcessCarousel, Process J1→J14 GND avec carousel 21st.dev (images Unsplash stacked) */
import * as React from 'react';
import { FeatureCarousel, type Step } from '@/components/ui/animated-feature-carousel';
import { Section, Container, Kicker } from '../ui';

// Images Unsplash, 6 URLs ORIGINALES du composant 21st.dev (testées, garanties existantes)
const PROCESS_IMAGES = {
  alt: 'GND Consulting, process sites vitrines',
  step1img1:
    'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=75&w=1000&auto=format&fit=crop',
  step1img2:
    'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=75&w=1000&auto=format&fit=crop',
  step2img1:
    'https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=75&w=1000&auto=format&fit=crop',
  step2img2:
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=75&w=1000&auto=format&fit=crop',
  step3img:
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=75&w=1000&auto=format&fit=crop',
  step4img:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=75&w=1000&auto=format&fit=crop',
};

const PROCESS_STEPS: readonly Step[] = [
  {
    id: '1',
    name: 'J1-J2',
    title: 'Briefing',
    description:
      "30 min en visio. On comprend votre métier, vos références, vos contraintes. Devis signé, acompte 50 % pour déclencher la production.",
    // ambient bg : poster Designbr-style "BRIEFING" (Nano Banana gen)
    bgImage: '/assets/process/brief.webp?v=1',
  },
  {
    id: '2',
    name: 'J3-J6',
    title: 'Maquette',
    description:
      "Mockup desktop + mobile. 3 itérations design incluses. Vous validez chaque écran avant qu'on touche au code.",
    // ambient bg : poster Designbr-style "DESIGN" (Nano Banana gen)
    bgImage: '/assets/process/design.webp?v=1',
  },
  {
    id: '3',
    name: 'J7-J11',
    title: 'Intégration',
    description:
      "Développement, SEO local, Schema.org, widgets intégrés (Zenchef, Stripe, Calendly selon votre besoin). Tests sur tous les écrans.",
    // ambient bg : poster Designbr-style "BUILD" (Nano Banana gen)
    bgImage: '/assets/process/build.png?v=1',
  },
  {
    id: '4',
    name: 'J12-J14',
    title: 'Mise en ligne',
    description:
      "Nom de domaine à votre nom, transfert des accès, 1 h de formation. 30 jours de support inclus après la livraison.",
    // ambient bg : poster Designbr-style "LIVE" (Nano Banana gen)
    bgImage: '/assets/process/live.png?v=1',
  },
];

export function ProcessCarousel() {
  return (
    <Section className="py-24 md:py-32">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <Kicker>Process en 14 jours</Kicker>
          <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong leading-tight">
            Du brief à la <span className="italic text-accent">mise en ligne</span>.
          </h2>
          <p className="mt-5 text-text leading-relaxed max-w-2xl">
            Aucune zone d'ombre. Vous savez ce qui se passe chaque jour, ce
            que vous validez à chaque étape.
          </p>
        </div>

        <FeatureCarousel
          image={PROCESS_IMAGES}
          steps={PROCESS_STEPS}
          interval={5500}
        />
      </Container>
    </Section>
  );
}
