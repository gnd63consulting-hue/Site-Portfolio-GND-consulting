/* Header + Footer — ported to ES modules (was window-global in prototype) */
import * as React from 'react';
import { Container } from './ui';
import { Icons } from './icons';

const NAV = [
  { to: "#/agence", label: "L'Agence" },
  { to: "#/services", label: "Services" },
  { to: "#/realisations", label: "Réalisations" },
  { to: "#/contact", label: "Contact" },
];

const SERVICES_MENU = [
  { to: "#/services/sites-vitrines", label: "Sites Vitrines", num: "01", desc: "Clé en main · 1–2 sem." },
  { to: "#/services/design-identite-visuelle", label: "Design & Identité", num: "02", desc: "Logos · chartes · supports" },
  { to: "#/services/motion-design", label: "Motion Design", num: "03", desc: "Animation 2D · 3D · habillages" },
  { to: "#/services/production-audiovisuelle", label: "Production Audiovisuelle", num: "04", desc: "Captation · clips · 4K/8K" },
  { to: "#/services/photographie", label: "Photographie", num: "05", desc: "Direction artistique · studio" },
  { to: "#/services/automatisation-ia", label: "Automatisation & IA", num: "06", desc: "Workflows · agents · audit" },
];

function Header({ route }: any) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [services, setServices] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  React.useEffect(() => { setOpen(false); setServices(false); }, [route]);

  // Hero passé à cream — header doit être lisible (texte chocolat) en tout temps,
  // y compris au top de page. Plus de mode "onDark".
  const onDark = false;
  const txt = "text-text-strong";
  const txtMuted = "text-text-muted";

  const isActive = (to: string) => {
    if (to === "#/services") return route.startsWith("/services");
    if (to === "#/realisations") return route.startsWith("/realisations");
    return route === to.replace("#", "");
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
      ${scrolled ? "bg-bg/85 backdrop-blur-md border-b hairline border-b" : "bg-transparent"}`}>
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#/" className="flex items-center gap-2.5 group focus-ring">
          <span className={`display text-2xl md:text-[28px] tracking-mega ${txt}`}>GND</span>
          <span className={`hidden sm:block label-mono text-[10px] pt-1 ${txtMuted}`}>— consulting</span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map(n => (
            <div key={n.to} className="relative"
              onMouseEnter={() => n.label === "Services" && setServices(true)}
              onMouseLeave={() => n.label === "Services" && setServices(false)}>
              <a href={n.to} data-active={isActive(n.to)}
                className={`nav-link text-sm font-medium ${txt} hover:text-accent transition-colors`}>
                {n.label}
              </a>
              {n.label === "Services" && services && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[640px] surface-card p-3 shadow-2xl shadow-text/10">
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
                  <div className="mt-2 p-3 flex items-center justify-between border-t hairline border-t">
                    <span className="label-mono">Vue d'ensemble</span>
                    <a href="#/services" className="arrow-link text-sm">Tous les services <Icons.ArrowRight size={14}/></a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#/contact" className="hidden md:inline-flex btn btn-primary">
            Démarrer un projet <Icons.ArrowUpRight size={14} stroke={1.8}/>
          </a>
          <button aria-label="Menu" onClick={() => setOpen(true)} className={`lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-full border focus-ring ${onDark ? "border-bg/30 text-bg" : "hairline border"}`}>
            <Icons.Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-bg z-50 anim-up overflow-y-auto">
          <div className="px-6 h-16 flex items-center justify-between border-b hairline border-b">
            <a href="#/" onClick={() => setOpen(false)} className="display text-2xl">GND</a>
            <button aria-label="Fermer" onClick={() => setOpen(false)} className="w-10 h-10 rounded-full border hairline border inline-flex items-center justify-center">
              <Icons.X size={20}/>
            </button>
          </div>
          <div className="px-6 py-8">
            <ul className="space-y-2">
              {NAV.map(n => (
                <li key={n.to}>
                  <a href={n.to} onClick={() => setOpen(false)}
                    className="block py-3 display text-4xl text-text-strong border-b hairline border-b">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <div className="kicker mb-4">Services</div>
              <ul className="space-y-1.5">
                {SERVICES_MENU.map(s => (
                  <li key={s.to}>
                    <a href={s.to} onClick={() => setOpen(false)}
                      className="flex items-center gap-3 py-2 text-text-strong">
                      <span className="label-mono">{s.num}</span>
                      <span className="text-base">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a href="#/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full justify-center mt-8">
              Démarrer un projet <Icons.ArrowUpRight size={14}/>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-text-strong text-bg pt-24 pb-10">
      <Container>
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 lg:gap-8 pb-16 border-b border-bg/15">
          <div className="space-y-6">
            <div className="display text-5xl md:text-6xl tracking-mega">GND</div>
            <p className="text-bg/70 max-w-md leading-relaxed">
              Studio créatif parisien — production audiovisuelle, design, automatisation IA.
              <span className="text-accent"> Humain × IA.</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://instagram.com/gndconsulting/" className="w-10 h-10 rounded-full border border-bg/20 inline-flex items-center justify-center hover:bg-bg/10 transition" aria-label="Instagram"><Icons.Instagram size={16}/></a>
              <a href="https://linkedin.com/in/roodny-pierre" className="w-10 h-10 rounded-full border border-bg/20 inline-flex items-center justify-center hover:bg-bg/10 transition" aria-label="LinkedIn"><Icons.Linkedin size={16}/></a>
              <a href="https://behance.net/gndconsulting" className="w-10 h-10 rounded-full border border-bg/20 inline-flex items-center justify-center hover:bg-bg/10 transition" aria-label="Behance"><Icons.Behance size={16}/></a>
            </div>
          </div>
          <div>
            <div className="kicker text-bg/60 mb-5">Navigation</div>
            <ul className="space-y-3 text-bg/85">
              <li><a href="#/agence" className="hover:text-accent">L'Agence</a></li>
              <li><a href="#/services" className="hover:text-accent">Services</a></li>
              <li><a href="#/realisations" className="hover:text-accent">Réalisations</a></li>
              <li><a href="#/contact" className="hover:text-accent">Contact</a></li>
              <li><a href="#/mentions-legales" className="hover:text-accent">Mentions légales</a></li>
            </ul>
          </div>
          <div>
            <div className="kicker text-bg/60 mb-5">Services</div>
            <ul className="space-y-3 text-bg/85">
              {SERVICES_MENU.map(s => (
                <li key={s.to}><a href={s.to} className="hover:text-accent">{s.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="kicker text-bg/60 mb-5">Contact</div>
            <ul className="space-y-3 text-bg/85">
              <li className="flex items-start gap-2"><Icons.Mail size={16} className="mt-1 text-accent"/><a href="mailto:contact@gndconsulting.fr">contact@gndconsulting.fr</a></li>
              <li className="flex items-start gap-2"><Icons.Phone size={16} className="mt-1 text-accent"/><a href="tel:+33759506322">07 59 50 63 22</a></li>
              <li className="flex items-start gap-2"><Icons.MapPin size={16} className="mt-1 text-accent"/>Paris, France</li>
            </ul>
            <a href="#/contact" className="btn btn-primary mt-6">
              Lancer un projet <Icons.ArrowUpRight size={14}/>
            </a>
          </div>
        </div>

        {/* signature mega type */}
        <div className="pt-14 overflow-hidden">
          <div className="display text-[18vw] leading-[.85] tracking-huge text-bg/95 select-none">GND<span className="text-accent">.</span></div>
          <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-bg/60 text-sm">
            <div>© {year} GND CONSULTING — STUDIO CRÉATIF PARISIEN <span className="text-accent">HUMAIN × IA</span></div>
            <div className="label-mono">SIREN 939 676 136 · TVA NON APPLICABLE · ART. 293 B CGI</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* Cookie banner */
function CookieBanner() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const seen = localStorage.getItem("gnd-cookies");
    if (!seen) setTimeout(() => setShow(true), 800);
  }, []);
  const dismiss = (v: string) => { localStorage.setItem("gnd-cookies", v); setShow(false); };
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-40 surface-card p-5 shadow-2xl shadow-text/20 anim-up">
      <div className="kicker mb-2">Cookies</div>
      <p className="text-sm text-text leading-relaxed">
        Nous utilisons des cookies pour mesurer l'audience et améliorer l'expérience. Consultez nos <a href="#/mentions-legales" className="underline decoration-accent underline-offset-4">mentions légales</a>.
      </p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => dismiss("custom")} className="btn btn-secondary flex-1 justify-center text-xs">Personnaliser</button>
        <button onClick={() => dismiss("accept")} className="btn btn-primary flex-1 justify-center text-xs">Accepter</button>
      </div>
    </div>
  );
}

export { Header, Footer, CookieBanner, SERVICES_MENU, NAV };
