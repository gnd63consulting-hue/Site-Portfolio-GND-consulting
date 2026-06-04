/* OwnershipBlock, "Le site, c'est votre maison", AnimatedTabs version.
 * 4 onglets : Nom de domaine / Code source / Comptes Google / Hébergement.
 * Tabs anim (framer-motion layoutId pill + spring) conservée intacte.
 */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Section, Container } from '../ui';
import { Icons } from '../icons';
import { AnimatedTabs, type AnimatedTab } from '@/components/ui/animated-tabs';

gsap.registerPlugin(ScrollTrigger);

type OwnershipItem = {
  id: string;
  label: string;
  shortLabel: string;
  title: string;
  body: string;
  image: string;
  Icon: React.ComponentType<{ size?: number }>;
};

const ITEMS: OwnershipItem[] = [
  {
    id: 'domaine',
    label: 'Le nom de domaine',
    shortLabel: 'Domaine',
    title: 'Le nom de domaine',
    body: "Enregistré directement à votre nom, vérifiable publiquement via WHOIS. Le jour où vous partez, vous partez avec votre adresse. Personne ne peut vous le retirer, le revendre ou le verrouiller. Première année offerte par GND, renouvellement direct (10 à 15 € par an) chez le bureau d'enregistrement.",
    image: '/assets/ownership-tab-domaine.png',
    Icon: Icons.Globe,
  },
  {
    id: 'code',
    label: 'Le code source',
    shortLabel: 'Code source',
    title: 'Le code source',
    body: "Le code complet du site vous est transmis sur un dépôt Git privé à votre nom. Vous pouvez le confier à un autre prestataire, l'auditer, le modifier, le reprendre en main quand vous voulez. Aucun verrou propriétaire, aucune dépendance à GND pour évoluer.",
    image: '/assets/ownership-tab-code.png',
    Icon: Icons.Cpu,
  },
  {
    id: 'google',
    label: 'Les comptes Google',
    shortLabel: 'Google',
    title: 'Les comptes Google',
    body: "Google Business Profile, Analytics, Search Console : les comptes sont créés à votre adresse e-mail, avec vos identifiants. Vous gardez l'accès permanent à vos données de fréquentation, vos avis, vos rapports SEO. Si vous quittez GND, vous gardez tout.",
    image: '/assets/ownership-tab-google.png',
    Icon: Icons.MapPin,
  },
  {
    id: 'hebergement',
    label: "L'hébergement",
    shortLabel: 'Hébergement',
    title: "L'hébergement",
    body: "Compte d'hébergement créé à votre nom, transférable en zéro-downtime vers un autre prestataire si besoin. Aucun contrat d'engagement, aucune captation. Vous payez l'hébergement directement, on documente la configuration pour la rendre reprenable par n'importe quelle équipe technique.",
    image: '/assets/ownership-tab-hebergement.png',
    Icon: Icons.Layers,
  },
];

function TabContent({ item }: { item: OwnershipItem }) {
  const Ico = item.Icon;
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center w-full h-full">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="rounded-xl w-full h-64 md:h-72 object-cover shadow-xl shadow-text-strong/15 border-0"
        />
        <span className="absolute top-4 left-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-text-strong shadow-lg">
          <Ico size={18} />
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="label-mono text-[10px] tracking-[0.22em] uppercase text-accent">
          Propriété totale
        </div>
        <h3 className="display text-2xl md:text-3xl text-text-strong leading-tight">
          {item.title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed text-text/80">
          {item.body}
        </p>
      </div>
    </div>
  );
}

export function OwnershipBlock() {
  const ref = React.useRef<HTMLDivElement>(null);

  const tabs: AnimatedTab[] = React.useMemo(
    () =>
      ITEMS.map((item) => ({
        id: item.id,
        label: item.shortLabel,
        content: <TabContent item={item} />,
      })),
    []
  );

  React.useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="own-header"]', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
      gsap.from('[data-anim="own-tabs"]', {
        opacity: 0,
        y: 28,
        scale: 0.97,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <Section className="py-20 md:py-28">
      <Container>
        <div ref={ref} className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Colonne texte */}
          <div className="lg:col-span-5" data-anim="own-header">
            <div className="label-mono text-[11px] tracking-[0.22em] text-text-muted mb-5">
             PROPRIÉTÉ TOTALE
            </div>
            <h2 className="display text-5xl md:text-7xl text-text-strong leading-[0.95]">
              Le site, c'est{' '}
              <span className="italic text-accent">votre maison</span>.
            </h2>
            <p className="mt-7 text-text/80 text-base md:text-lg leading-relaxed max-w-md">
              Pas une location chez un acteur propriétaire, pas un sous-domaine
              chez un constructeur grand public. Vous avez les clés. Le jour où
              vous partez, vous partez avec tout, sans nous demander la
              permission.
            </p>
            <a
              href="#tarifs"
              className="btn mt-9"
              style={{ background: '#FF954F', color: '#2A1810' }}
            >
              Voir les formules
              <Icons.ArrowUpRight size={14} />
            </a>
          </div>

          {/* Tabs animées */}
          <div className="lg:col-span-7" data-anim="own-tabs">
            <AnimatedTabs tabs={tabs} variant="light" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
