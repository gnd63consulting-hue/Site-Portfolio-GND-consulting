import React, { useState, useMemo, useEffect, useRef } from 'react';

/* ────────────────────────────────────────────────────────────────────────── */
/*  Types                                                                    */
/* ────────────────────────────────────────────────────────────────────────── */
type Category = 'tous' | 'audiovisuel' | 'photo';

interface PortfolioProject {
  id: string;
  title: string;
  category: Exclude<Category, 'tous'>;
  thumbnail: string;
  mediaUrl?: string;
  tags: string[];
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Données                                                                  */
/* ────────────────────────────────────────────────────────────────────────── */
const filters: { key: Category; label: string }[] = [
  { key: 'tous', label: 'Tous' },
  { key: 'audiovisuel', label: 'Vidéos' },
  { key: 'photo', label: 'Photos' },
];

const allProjects: PortfolioProject[] = [
  /* ── Audiovisuel ─────────────────────────────────────────────────────── */
  {
    id: 'esther-seems-bobine',
    title: 'ESTHER SEEMS – BOBINE',
    category: 'audiovisuel',
    thumbnail: 'https://img.youtube.com/vi/6oaO6YoWjyQ/maxresdefault.jpg',
    tags: ['Clip Musical', 'Réalisation'],
  },
  {
    id: 'leyel-miel',
    title: 'LEYEL – MIEL',
    category: 'audiovisuel',
    thumbnail: 'https://img.youtube.com/vi/UbXQim7iNLI/maxresdefault.jpg',
    tags: ['Clip Musical', 'Variété'],
  },
  {
    id: 'sabay-festival-2023',
    title: 'SABAY FESTIVAL 2023',
    category: 'audiovisuel',
    thumbnail: 'https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg',
    tags: ['Aftermovie', 'Événementiel'],
  },
  {
    id: 'concert-ali',
    title: 'CAPTATION LIVE CONCERT ALI 45 SCIENTIFIC',
    category: 'audiovisuel',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
    mediaUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Concert%20Ali.mp4',
    tags: ['Captation Live', 'Concert'],
  },
  {
    id: 'sabay-festival-2022',
    title: 'SABAY FESTIVAL 2022',
    category: 'audiovisuel',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
    mediaUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Thiek%20au%20Sabay%20Festival%202022%20Haute%20def%204k%20v2.mp4',
    tags: ['Aftermovie', 'Événementiel'],
  },
  {
    id: 'cook-soul-kaoutar',
    title: 'COOK & SOUL AVEC KAOUTAR',
    category: 'audiovisuel',
    thumbnail: 'https://img.youtube.com/vi/galhl8_dYyk/maxresdefault.jpg',
    tags: ['Émission', 'Production'],
  },
  {
    id: 'yungcally',
    title: 'YUNGCALLY – CLIP OFFICIEL',
    category: 'audiovisuel',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
    mediaUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/jyfviku.mp4',
    tags: ['Clip Musical', 'Hip-Hop'],
  },
  {
    id: 'trinity-rebel',
    title: 'TRINITY REBEL FT DAFXCX – L\'UNIVERS OFFICIEL',
    category: 'audiovisuel',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
    mediaUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/trinity_rebel_univers_officiel.mp4',
    tags: ['Motion Design', 'Clip Musical'],
  },
  {
    id: 'lanecdote',
    title: 'L\'ANECDOTE',
    category: 'audiovisuel',
    thumbnail: 'https://img.youtube.com/vi/AGC_2cFHE_0/maxresdefault.jpg',
    tags: ['Émission', 'Production'],
  },
  /* ── Photo ───────────────────────────────────────────────────────────── */
  {
    id: 'corporate-1',
    title: 'MASQUE & IDENTITÉ',
    category: 'photo',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4251.jpg',
    tags: ['Portrait', 'Corporate'],
  },
  {
    id: 'corporate-2',
    title: 'L\'ART EN MOUVEMENT',
    category: 'photo',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4135.jpg',
    tags: ['Portrait', 'Créatif'],
  },
  {
    id: 'corporate-3',
    title: 'PUISSANCE CRÉATIVE',
    category: 'photo',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4149.jpg',
    tags: ['Portrait', 'Studio'],
  },
  {
    id: 'corporate-4',
    title: 'VISION MASQUÉE',
    category: 'photo',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4267.jpg',
    tags: ['Portrait', 'Artistique'],
  },
  {
    id: 'event-1',
    title: 'SAVEURS',
    category: 'photo',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A1817.JPG',
    tags: ['Événementiel', 'Culinaire'],
  },
  {
    id: 'event-2',
    title: 'INSTANTS',
    category: 'photo',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A1873%20-%20copie%202_1.jpg',
    tags: ['Événementiel', 'Ambiance'],
  },
  {
    id: 'event-3',
    title: 'PARTAGES',
    category: 'photo',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A2054.JPG',
    tags: ['Événementiel', 'Reportage'],
  },
  {
    id: 'branding-1',
    title: 'ÉNERGIE COLLECTIVE',
    category: 'photo',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4028.jpg',
    tags: ['Portrait', 'Groupe'],
  },
  {
    id: 'branding-2',
    title: 'ATTITUDE & CONFIANCE',
    category: 'photo',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A3992.jpg',
    tags: ['Portrait', 'Studio'],
  },
  {
    id: 'branding-3',
    title: 'VISION URBAINE',
    category: 'photo',
    thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4002.JPG',
    tags: ['Portrait', 'Urbain'],
  },
];

const ITEMS_PER_PAGE = 8;

/* ────────────────────────────────────────────────────────────────────────── */
/*  Carte projet                                                             */
/* ────────────────────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  aspect,
  index,
}: {
  project: PortfolioProject;
  aspect: string;
  index: number;
}) {
  return (
    <div
      className={`group relative ${aspect} rounded-2xl overflow-hidden`}
    >
      {project.mediaUrl ? (
        <video
          src={`${project.mediaUrl}#t=0.1`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            const src = target.src;
            if (src.includes('maxresdefault')) {
              target.src = src.replace('maxresdefault', 'hq720');
            } else if (src.includes('hq720')) {
              target.src = src.replace('hq720', 'sddefault');
            } else if (src.includes('sddefault')) {
              target.src = src.replace('sddefault', 'hqdefault');
            }
          }}
        />
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Numéro watermark */}
      <span className="absolute top-4 left-5 font-display text-[11px] font-semibold text-white/40 tracking-widest uppercase">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Flèche en haut à droite */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:bg-white group-hover:text-black text-white">
        <span className="material-symbols-outlined text-lg">arrow_outward</span>
      </div>

      {/* Contenu bas */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-semibold text-white leading-tight">
          {project.title}
        </h3>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Page Portfolio                                                           */
/* ────────────────────────────────────────────────────────────────────────── */
export function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('tous');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Trigger reveal animations on this SPA sub-page
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.05 },
    );
    const frame = requestAnimationFrame(() => {
      mainRef.current
        ?.querySelectorAll('.reveal')
        .forEach((el) => observer.observe(el));
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'tous') return allProjects;
    return allProjects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const leftCol = visible.filter((_, i) => i % 2 === 0);
  const rightCol = visible.filter((_, i) => i % 2 === 1);

  const handleFilterChange = (key: Category) => {
    setActiveFilter(key);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <main ref={mainRef} className="pt-32 pb-0">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 max-w-[1400px] mx-auto text-center mb-16 reveal">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted">
            Portfolio
          </span>
        </div>
        <h1 className="font-display font-semibold text-[clamp(2.5rem,6vw,4.5rem)] text-text-main leading-[0.95]">
          Nos Réalisations
        </h1>
        <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto mt-6">
          Clips musicaux, captations live, motion design, photographie et identité
          visuelle&nbsp;: découvrez les projets qui illustrent notre savoir-faire
          créatif et technique.
        </p>
      </section>

      {/* ── FILTRES (pills) ──────────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 max-w-[1400px] mx-auto mb-14 reveal delay-100">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => handleFilterChange(f.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium font-display transition-all duration-300 ${
                activeFilter === f.key
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Compteur de résultats */}
        <p className="text-center text-sm text-text-muted mt-6">
          {filtered.length} projet{filtered.length > 1 ? 's' : ''}
        </p>
      </section>

      {/* ── GRILLE ASYMÉTRIQUE ───────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 max-w-[1400px] mx-auto reveal delay-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colonne gauche — aspect-[4/3] */}
          <div className="flex flex-col gap-6">
            {leftCol.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspect="aspect-[4/3]"
                index={idx * 2}
              />
            ))}
          </div>

          {/* Colonne droite — aspect-[3/4] avec décalage vertical */}
          <div className="flex flex-col gap-6 md:mt-24">
            {rightCol.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspect="aspect-[3/4]"
                index={idx * 2 + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CHARGER PLUS ─────────────────────────────────────────────────── */}
      {hasMore && (
        <div className="text-center mt-16 reveal">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
            className="inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 text-sm font-medium font-display transition-all duration-300 hover:bg-gray-800 hover:scale-105"
          >
            Charger plus
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 max-w-[1400px] mx-auto mt-24 mb-24 reveal">
        <div className="bg-black rounded-3xl p-12 md:p-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs font-medium uppercase tracking-widest text-gray-400 mb-8">
            Collaboration
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight mb-4">
            Un projet en tête&nbsp;?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Discutons de votre vision et donnons vie à vos idées créatives.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-black rounded-full px-8 py-4 text-sm font-medium font-display transition-all duration-300 hover:bg-gray-100 hover:scale-105 no-underline"
          >
            Démarrer un projet
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </section>
    </main>
  );
}
