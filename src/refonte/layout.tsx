/* Header + Footer, ported to ES modules (was window-global in prototype) */
import * as React from 'react';
import { Container } from './ui';
import { Icons } from './icons';
import { SocialCard } from '@/components/ui/social-card';

const NAV = [
  { to: "/agence", label: "L'Agence" },
  { to: "/services", label: "Services" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/contact", label: "Contact" },
];

const SERVICES_MENU = [
  { to: "/services/sites-vitrines", label: "Sites & SEO", num: "01", desc: "Sites vitrines · landing · SEO local" },
  { to: "/services/branding-identite", label: "Branding & Identité", num: "02", desc: "Marque · logo · charte · direction créative" },
  { to: "/services/audiovisuel", label: "Audiovisuel", num: "03", desc: "Vidéo · motion · photo · contenus sociaux" },
  { to: "/services/automatisation-ia", label: "Automatisation & IA", num: "04", desc: "Workflows · agents · audit & adoption" },
];

function Header({ route }: any) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [services, setServices] = React.useState(false);
  const [mobileServices, setMobileServices] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const openServices = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setServices(true);
  };
  const scheduleCloseServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServices(false), 180);
  };
  React.useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  React.useEffect(() => { setOpen(false); setServices(false); setMobileServices(false); }, [route]);

  // Hero passé à cream, header doit être lisible (texte chocolat) en tout temps,
  // y compris au top de page. Plus de mode "onDark".
  const onDark = false;
  const txt = "text-text-strong";
  const txtMuted = "text-text-muted";

  const isActive = (to: string) => {
    if (to === "/services") return route.startsWith("/services");
    if (to === "/realisations") return route.startsWith("/realisations");
    return route === to;
  };

  return (
    <>
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 pt-safe
      ${scrolled ? "bg-bg/85 backdrop-blur-md border-b hairline border-b" : "bg-transparent"}`}>
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 h-20 md:h-24 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group focus-ring" aria-label="GND Consulting, accueil">
          <img
            src="/assets/logos/gnd-logo-chocolat-cropped.png"
            alt="GND Consulting"
            className="h-11 md:h-12 w-auto select-none"
            draggable={false}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map(n => (
            <div key={n.to} className="relative"
              onMouseEnter={() => n.label === "Services" && openServices()}
              onMouseLeave={() => n.label === "Services" && scheduleCloseServices()}>
              {n.label === "Services" ? (
                /* « Services » = déclencheur du menu uniquement (la page hub
                   /services est supprimée — chaque branche a sa propre page). */
                <button
                  type="button"
                  aria-expanded={services}
                  data-active={isActive(n.to)}
                  onClick={() => setServices(v => !v)}
                  className={`nav-link text-sm font-medium ${txt} hover:text-accent transition-colors`}
                >
                  {n.label}
                </button>
              ) : (
                <a href={n.to} data-active={isActive(n.to)}
                  className={`nav-link text-sm font-medium ${txt} hover:text-accent transition-colors`}>
                  {n.label}
                </a>
              )}
              {n.label === "Services" && services && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[640px]"
                  onMouseEnter={openServices} onMouseLeave={scheduleCloseServices}>
                <div className="surface-card p-3 shadow-2xl shadow-text/10">
                  <div className="grid grid-cols-2 gap-1">
                    {SERVICES_MENU.map(s => (
                      <a key={s.to} href={s.to} className="flex items-start gap-3 p-3 rounded-xl hover:bg-bg-alt transition">
                        <span className="label-mono pt-1">{s.num}</span>
                        <div>
                          <div className="text-sm font-medium text-text-strong">{s.label}</div>
                          <div className="text-xs text-text-muted mt-0.5">{s.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="/contact" className="hidden lg:inline-flex btn btn-primary">
            Démarrer un projet <Icons.ArrowUpRight size={14} stroke={1.8}/>
          </a>
          <button aria-label="Menu" onClick={() => setOpen(true)} className={`lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-full border focus-ring ${onDark ? "border-bg/30 text-bg" : "hairline border"}`}>
            <Icons.Menu size={20} />
          </button>
        </div>
      </div>

      </header>

      {/* Mobile menu — rendu HORS du <header> : le backdrop-blur du header (quand
          scrollé) crée un containing block qui casse le position:fixed du menu →
          sinon le menu n'apparaît pas si on ouvre le burger en milieu/bas de page. */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-bg z-[60] anim-up overflow-y-auto">
          <div className="px-6 h-16 flex items-center justify-between border-b hairline border-b">
            <a href="/" onClick={() => setOpen(false)} className="inline-flex" aria-label="GND Consulting, accueil">
              <img
                src="/assets/logos/gnd-logo-chocolat-cropped.png"
                alt="GND Consulting"
                className="h-11 w-auto select-none"
                draggable={false}
              />
            </a>
            <button aria-label="Fermer" onClick={() => setOpen(false)} className="w-10 h-10 rounded-full border hairline border inline-flex items-center justify-center">
              <Icons.X size={20}/>
            </button>
          </div>
          <div className="px-6 py-8">
            <ul className="space-y-2">
              {NAV.map(n => (
                n.label === "Services" ? (
                  <li key={n.to}>
                    <button
                      type="button"
                      aria-expanded={mobileServices}
                      onClick={() => setMobileServices(v => !v)}
                      className="w-full flex items-center justify-between py-3 display text-4xl text-text-strong border-b hairline border-b"
                    >
                      <span>Services</span>
                      <Icons.ArrowDown size={26} className={`transition-transform duration-300 ${mobileServices ? "rotate-180" : ""}`} />
                    </button>
                    {mobileServices && (
                      <ul className="mt-3 mb-1 space-y-1 border-l-2 border-accent/30 pl-4 anim-up">
                        {SERVICES_MENU.map(s => (
                          <li key={s.to}>
                            <a href={s.to} onClick={() => setOpen(false)}
                              className="flex items-center gap-3 py-2.5 text-text-strong">
                              <span className="label-mono text-accent-deep">{s.num}</span>
                              <span className="text-lg">{s.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={n.to}>
                    <a href={n.to} onClick={() => setOpen(false)}
                      className="block py-3 display text-4xl text-text-strong border-b hairline border-b">
                      {n.label}
                    </a>
                  </li>
                )
              ))}
            </ul>
            <a href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full justify-center mt-8">
              Démarrer un projet <Icons.ArrowUpRight size={14}/>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  // Local time Paris
  const [parisTime, setParisTime] = React.useState('');
  React.useEffect(() => {
    const tick = () => {
      const fmt = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setParisTime(fmt.format(new Date()));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative w-full overflow-hidden bg-text-strong text-bg rounded-t-[36px] md:rounded-t-[56px]">
      <style>{`
        @keyframes gnd-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
        .gnd-pulse { animation: gnd-pulse-dot 1.8s ease-in-out infinite; }

        /* Email mega - cursor-aware: clip-path reveals accent on hover */
        .gnd-email-mega {
          position: relative;
          display: inline-block;
          color: rgba(253,246,238,0.92);
          background: linear-gradient(180deg, rgba(253,246,238,0.92) 0%, rgba(253,246,238,0.55) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gnd-email-mega::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          color: #FF954F;
          -webkit-text-fill-color: #FF954F;
          clip-path: inset(100% 0 0 0);
          transition: clip-path 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gnd-email-mega:hover::after { clip-path: inset(0 0 0 0); }
        .gnd-email-mega:hover { transform: translateY(-4px); }

        /* GND mega watermark, infinite horizontal marquee scroll behind content */
        @keyframes gnd-marquee-slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .gnd-watermark {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 2vw;
          width: 100%;
          overflow: hidden;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .gnd-watermark-track {
          display: inline-flex;
          white-space: nowrap;
          animation: gnd-marquee-slide 28s linear infinite;
          will-change: transform;
        }
        .gnd-watermark-track span {
          font-size: clamp(10rem, 26vw, 26rem);
          line-height: 0.78;
          letter-spacing: -0.05em;
          font-weight: 700;
          font-family: ui-serif, Georgia, 'Times New Roman', serif;
          color: rgba(253,246,238,0.06);
          padding-right: 0.3em;
          display: inline-block;
        }
        .gnd-watermark-track .dot { color: rgba(255,149,79,0.35); }
        @media (prefers-reduced-motion: reduce) {
          .gnd-watermark-track { animation: none !important; }
        }

        /* Nav link underline draw */
        .gnd-link {
          position: relative;
          padding-bottom: 2px;
        }
        .gnd-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: currentColor;
          opacity: 0.15;
          transform-origin: right;
          transform: scaleX(1);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s;
        }
        .gnd-link:hover::after {
          opacity: 1;
          color: #FF954F;
          background: #FF954F;
          transform-origin: left;
          transform: scaleX(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .gnd-pulse { animation: none !important; }
        }
      `}</style>

      {/* GND mega watermark, infinite horizontal marquee scroll (Royal Palace pattern) */}
      <div className="gnd-watermark" aria-hidden="true">
        <div className="gnd-watermark-track">
          {/* duplicated for seamless loop : transform -50% lands second copy at first copy position */}
          <span>GND<span className="dot">.</span>&nbsp;&nbsp;GND<span className="dot">.</span>&nbsp;&nbsp;GND<span className="dot">.</span>&nbsp;&nbsp;GND<span className="dot">.</span>&nbsp;&nbsp;</span>
          <span>GND<span className="dot">.</span>&nbsp;&nbsp;GND<span className="dot">.</span>&nbsp;&nbsp;GND<span className="dot">.</span>&nbsp;&nbsp;GND<span className="dot">.</span>&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* Subtle warm radial atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 50% 0%, rgba(255,149,79,0.10) 0%, transparent 70%)',
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-[max(4rem,env(safe-area-inset-bottom))]">

        {/* Top status row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] label-mono mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 text-bg/90">
            <span className="gnd-pulse inline-block h-2 w-2 rounded-full bg-accent" />
            <span className="tracking-[0.24em] uppercase">Studio actif · Paris {parisTime && `· ${parisTime}`}</span>
          </div>
          <div className="text-bg/70 tracking-[0.24em] uppercase">
            Humain × IA · {year}
          </div>
        </div>

        {/* MEGA EMAIL, center stage, cursor-aware clip-path reveal */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs tracking-[0.28em] uppercase text-bg/75 mb-6">Un brief, un échange</p>
          <a
            href="mailto:contact@gndconsulting.fr"
            className="gnd-email-mega display block leading-[1.3] tracking-tight pb-4 md:pb-6 px-4 md:px-8"
            data-text="contact@gndconsulting.fr"
            style={{
              fontSize: 'clamp(1.5rem, 4.6vw, 4.6rem)',
            }}
          >
            contact@gndconsulting.fr
          </a>
          <p className="mt-6 text-sm text-bg/75">
            Réponse écrite sous 24h. <a href="tel:+33759506322" className="text-bg hover:text-accent transition">07 59 50 63 22</a>
          </p>
        </div>

        {/* Bottom row : nav links inline + socials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10 border-t border-bg/12">

          {/* Navigation */}
          <div className="md:col-span-3">
            <div className="text-[10px] label-mono tracking-[0.24em] uppercase text-bg/70 mb-4">Navigation</div>
            <ul className="space-y-2 text-sm">
              <li><a href="/agence" className="gnd-link text-bg/85 hover:text-bg transition-colors">L'Agence</a></li>
              <li><a href="/services/sites-vitrines" className="gnd-link text-bg/85 hover:text-bg transition-colors">Sites &amp; SEO</a></li>
              <li><a href="/services/branding-identite" className="gnd-link text-bg/85 hover:text-bg transition-colors">Branding &amp; Identité</a></li>
              <li><a href="/services/audiovisuel" className="gnd-link text-bg/85 hover:text-bg transition-colors">Audiovisuel</a></li>
              <li><a href="/services/automatisation-ia" className="gnd-link text-bg/85 hover:text-bg transition-colors">Automatisation &amp; IA</a></li>
              <li><a href="/realisations" className="gnd-link text-bg/85 hover:text-bg transition-colors">Réalisations</a></li>
              <li><a href="/contact" className="gnd-link text-bg/85 hover:text-bg transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Branches */}
          <div className="md:col-span-3">
            <div className="text-[10px] label-mono tracking-[0.24em] uppercase text-bg/70 mb-4">Branches</div>
            <ul className="space-y-2 text-sm">
              {SERVICES_MENU.map(s => (
                <li key={s.to}>
                  <a href={s.to} className="gnd-link text-bg/85 hover:text-bg transition-colors">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div className="md:col-span-3">
            <div className="text-[10px] label-mono tracking-[0.24em] uppercase text-bg/70 mb-4">Studio</div>
            <p className="text-sm text-bg/85 leading-relaxed">
              Paris, France<br />
              <a href="mailto:contact@gndconsulting.fr" className="gnd-link text-bg/85 hover:text-bg transition-colors">contact@gndconsulting.fr</a><br />
              <a href="/mentions-legales" className="gnd-link text-bg/55 hover:text-bg transition-colors text-xs">Mentions légales</a>
            </p>
          </div>

          {/* Social, SocialCard hover-reveal staggered */}
          <div className="md:col-span-3 flex md:justify-end">
            <SocialCard title="Socials" />
          </div>
        </div>

        {/* Bottom legal strip, minimal */}
        <div className="mt-12 pt-6 border-t border-bg/15 flex flex-col gap-2 text-[10px] label-mono text-bg/65 md:flex-row md:justify-between md:items-center">
          <span className="tracking-[0.20em] uppercase">© {year} GND CONSULTING · STUDIO PARISIEN</span>
          <span className="tracking-[0.20em] uppercase">SIREN 939 676 136 · TVA NON APPLICABLE · ART. 293 B CGI</span>
        </div>
      </div>
    </footer>
  );
}

/* Cookie banner — conforme CNIL : « Tout refuser » aussi simple et visible
   que « Accepter ». Le choix est stocké en JSON dans `gnd-cookie-consent`
   (clé lue par src/utils/analytics.ts) ; GA4 ne se charge QUE si analytics
   accepté ET VITE_GA_MEASUREMENT_ID défini. */
function CookieBanner() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const seen = localStorage.getItem("gnd-cookie-consent");
    if (!seen) setTimeout(() => setShow(true), 800);
  }, []);
  const decide = (analytics: boolean) => {
    localStorage.setItem("gnd-cookie-consent", JSON.stringify({ analytics, ts: Date.now() }));
    setShow(false);
    if (analytics) {
      import('../utils/analytics').then(({ initAnalytics }) =>
        initAnalytics((import.meta as any).env?.VITE_GA_MEASUREMENT_ID)
      );
    }
  };
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-40 surface-card p-5 shadow-2xl shadow-text/20 anim-up">
      <div className="kicker mb-2">Cookies</div>
      <p className="text-sm text-text leading-relaxed">
        Nous utilisons des cookies pour mesurer l'audience et améliorer l'expérience. Refuser n'affecte pas votre navigation. Consultez nos <a href="/mentions-legales" className="underline decoration-accent underline-offset-4">mentions légales</a>.
      </p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => decide(false)} className="btn btn-secondary flex-1 justify-center text-xs">Tout refuser</button>
        <button onClick={() => decide(true)} className="btn btn-primary flex-1 justify-center text-xs">Accepter</button>
      </div>
    </div>
  );
}

export { Header, Footer, CookieBanner, SERVICES_MENU, NAV };
