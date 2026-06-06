/* /contact, form + scheduler, ported to ES modules (.form-input now lives in refonte.css) */
import * as React from 'react';
import { Container, Kicker, CinematicHero } from '../ui';
import { Icons } from '../icons';
import ScrollExpandHero from '@/components/blocks/scroll-expansion-hero';
import { MarqueeCTA } from '../components/MarqueeCTA';

function ContactPage() {
  const [form, setForm] = React.useState({ name:"", email:"", service:"", message:"" });
  const [errors, setErrors] = React.useState<any>({});
  const [status, setStatus] = React.useState("idle"); // idle / loading / success / error
  const set = (k: string, v: string) => setForm(f => ({...f, [k]: v}));

  const validate = () => {
    const e: any = {};
    if (!form.name.trim()) e.name = "Votre nom est requis";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Email invalide";
    if (!form.service) e.service = "Sélectionnez un service";
    if (form.message.trim().length < 10) e.message = "Décrivez brièvement votre projet (min. 10 caractères)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1100);
  };

  return (
    <main id="main">
      {/* HERO #1, ScrollExpandHero (même hero 1 que toutes les pages). */}
      <div className="pt-20 md:pt-24 bg-bg-alt">
        <ScrollExpandHero
          mediaType="video"
          mediaSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4"
          posterSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png"
          bgImageSrc="/assets/hero1-bg.png"
          title="Parlons de votre projet."
          date="GND · Contact"
          scrollToExpand="Scrollez pour révéler"
          textColorClass="text-bg"
        />
      </div>

      {/* Marquee CTA entre Hero #1 et Hero #2 (mirror autres pages). */}
      <MarqueeCTA />

      {/* HERO #2, contact (CinematicHero). */}
      <CinematicHero
        kicker="Contact"
        eyebrow="contact"
        title={<>Parlons de votre<br/><span className="italic text-accent">projet</span>.</>}
        subtitle={<>Prêt à donner vie à vos idées créatives ? Partagez votre vision, nous revenons vers vous <strong className="text-bg">sous 24h</strong>.</>}
        badges={["Réponse sous 24h", "Devis 48h", "Sans engagement"]}
        ctas={<>
          <a href="#form" className="btn btn-primary">Envoyer un brief <Icons.ArrowDown size={14}/></a>
          <a href="#rdv" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Réserver un RDV <Icons.Calendar size={14}/></a>
        </>}
        media={
          <div className="space-y-3 max-w-[420px] mx-auto">
            <div className="rounded-2xl bg-bg/95 p-5 shadow-2xl shadow-black/40">
              <div className="kicker">email</div>
              <div className="mt-2 text-text-strong font-medium">contact@gndconsulting.fr</div>
            </div>
            <div className="rounded-2xl bg-text-strong/80 border border-bg/15 backdrop-blur p-5">
              <div className="kicker !text-bg/55">téléphone</div>
              <div className="mt-2 text-bg font-medium">07 59 50 63 22</div>
            </div>
            <div className="rounded-2xl bg-accent/95 p-5">
              <div className="kicker !text-text-strong/70">studio</div>
              <div className="mt-2 text-text-strong font-medium">Paris, France · sur RDV</div>
            </div>
          </div>
        }
        footerLabel="contact"
      />

      <section id="form" className="py-12 md:py-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-7">
              <form onSubmit={onSubmit} className="surface-card p-7 md:p-10">
                {status === "success" ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent/15 text-accent-deep flex items-center justify-center">
                      <Icons.Check size={28} stroke={2}/>
                    </div>
                    <h3 className="display text-3xl mt-6 text-text-strong">Demande envoyée.</h3>
                    <p className="mt-3 text-text">Nous revenons vers vous sous 24h, à l'adresse <strong>{form.email}</strong>.</p>
                    <button onClick={() => { setStatus("idle"); setForm({ name:"", email:"", service:"", message:"" }); }}
                      className="btn btn-secondary mt-8">Envoyer un autre message</button>
                  </div>
                ) : (
                  <>
                    <Kicker>Brief rapide</Kicker>
                    <h2 className="display text-3xl text-text-strong mt-3">Votre projet en quelques lignes.</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label="Nom complet*" id="name" error={errors.name}>
                        <input id="name" value={form.name} onChange={e => set("name", e.target.value)}
                          className="form-input" placeholder="Roodny Pierre"/>
                      </Field>
                      <Field label="Email*" id="email" error={errors.email}>
                        <input id="email" type="email" value={form.email} onChange={e => set("email", e.target.value)}
                          className="form-input" placeholder="vous@entreprise.fr"/>
                      </Field>
                      <Field label="Service souhaité*" id="service" error={errors.service} className="md:col-span-2">
                        <div className="relative">
                          <select id="service" value={form.service} onChange={e => set("service", e.target.value)}
                            className="form-input appearance-none pr-10">
                            <option value="">Sélectionnez…</option>
                            <option>Sites Vitrines</option>
                            <option>Design & Identité Visuelle</option>
                            <option>Motion Design</option>
                            <option>Production Audiovisuelle</option>
                            <option>Photographie</option>
                            <option>Automatisation & IA</option>
                            <option>Autre</option>
                          </select>
                          <Icons.ArrowDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted"/>
                        </div>
                      </Field>
                      <Field label="Message*" id="message" error={errors.message} className="md:col-span-2">
                        <textarea id="message" rows={5} value={form.message} onChange={e => set("message", e.target.value)}
                          className="form-input resize-none" placeholder="Contexte, objectif, échéance, références…"/>
                      </Field>
                    </div>
                    <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <p className="text-xs text-text-muted max-w-sm">Vos données sont sécurisées et ne seront jamais partagées. Voir nos <a href="#/mentions-legales" className="underline decoration-accent underline-offset-4">mentions légales</a>.</p>
                      <button type="submit" disabled={status === "loading"} className="btn btn-primary">
                        {status === "loading" ? "Envoi…" : "Envoyer ma demande"}
                        {status !== "loading" && <Icons.ArrowUpRight size={14}/>}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>

            {/* Right column: scheduler bento + coordinates */}
            <div className="lg:col-span-5 space-y-5">
              <Scheduler/>
              <div className="surface-card p-7">
                <Kicker>Coordonnées</Kicker>
                <ul className="mt-5 space-y-4 text-text-strong">
                  <li className="flex items-start gap-3">
                    <Icons.Mail size={18} className="text-accent mt-0.5"/>
                    <a href="mailto:contact@gndconsulting.fr">contact@gndconsulting.fr</a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icons.Phone size={18} className="text-accent mt-0.5"/>
                    <a href="tel:+33759506322">07 59 50 63 22</a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icons.MapPin size={18} className="text-accent mt-0.5"/>
                    Paris, France
                  </li>
                  <li className="flex items-start gap-3">
                    <Icons.Clock size={18} className="text-accent mt-0.5"/>
                    Réponse sous 24h ouvrées
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function Field({ label, id, error, children, className = "" }: any) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs text-text-muted mb-2 font-medium">{label}</label>
      {children}
      {error && <div className="text-xs text-accent-deep mt-1.5">{error}</div>}
    </div>
  );
}

/* Scheduler bento */
function Scheduler() {
  const days = ["L", "M", "M", "J", "V"];
  const dates = [19, 20, 21, 22, 23];
  const times = ["09:30", "11:00", "14:00", "15:30", "17:00"];
  const [day, setDay] = React.useState(2);
  const [time, setTime] = React.useState(2);
  const [booked, setBooked] = React.useState(false);
  return (
    <div id="rdv" className="rounded-3xl bg-text-strong text-bg p-7 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="kicker text-bg/55">Réserver un échange</div>
            <div className="display text-2xl mt-2">30 min, sans engagement</div>
          </div>
          <Icons.Calendar size={22} className="text-accent"/>
        </div>

        {booked ? (
          <div className="mt-8 text-center py-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-accent text-text-strong flex items-center justify-center"><Icons.Check size={22}/></div>
            <div className="mt-4 display text-2xl">Réservé · {days[day]} {dates[day]} · {times[time]}</div>
            <p className="text-sm text-bg/65 mt-2">Confirmation envoyée par email.</p>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-5 gap-2">
              {dates.map((d, i) => (
                <button key={d} onClick={() => setDay(i)}
                  className={`p-3 rounded-xl border ${i === day ? "border-accent bg-accent/15 text-accent" : "border-bg/15 text-bg/80 hover:bg-bg/5"}`}>
                  <div className="label-mono text-[10px]">{days[i]}</div>
                  <div className="num-display text-xl mt-1">{d}</div>
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {times.map((t, i) => (
                <button key={t} onClick={() => setTime(i)}
                  className={`py-2 px-3 rounded-lg text-sm border transition ${i === time ? "border-accent bg-accent text-text-strong font-medium" : "border-bg/15 text-bg/80 hover:bg-bg/5"}`}>
                  {t}
                </button>
              ))}
            </div>
            <button onClick={() => setBooked(true)} className="btn btn-primary w-full justify-center mt-6">
              Confirmer le créneau <Icons.ArrowUpRight size={14}/>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export { ContactPage };
