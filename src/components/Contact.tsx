import React, { useState } from 'react';
import {
  CheckCircle,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { AIChat } from './AIChat';
import { FAQ } from './FAQ';
import { useContacts } from '../hooks/useSupabase';
import { trackEvent } from '../utils/analytics';

interface ContactProps {
  themeColor?: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  showFAQ?: boolean;
}

export function Contact({ showFAQ = true }: ContactProps = {}) {
  const { addContact } = useContacts();
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    files: [] as File[]
  });

  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [interactionCount, setInteractionCount] = useState(0);
  const [formOpenedAt] = useState<number>(() => Date.now());

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Le nom est obligatoire');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('L\'email est obligatoire');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Format d\'email invalide');
      return false;
    }
    if (!formData.projectType) {
      setErrorMessage('Le service souhaité est obligatoire');
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Le message est obligatoire');
      return false;
    }
    const elapsedMs = Date.now() - formOpenedAt;
    if (interactionCount < 2 || elapsedMs < 3000) {
      setErrorMessage('Veuillez compléter le formulaire normalement avant envoi.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      if (import.meta.env.MODE === 'development') {
        console.log('Tentative de spam détectée');
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    if (!validateForm()) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    try {
      trackEvent('form_submit_attempt', { form: 'contact' });

      const contactData = {
        nom: formData.name,
        email: formData.email,
        telephone: null,
        entreprise: null,
        type_projet: formData.projectType,
        budget: null,
        delai_souhaite: null,
        message: formData.message,
        fichiers_joints: null
      };

      const result = await addContact(contactData);

      if (!result.success) {
        throw new Error('Erreur lors de l\'enregistrement en base');
      }

      try {
        const emailResponse = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contactData }),
          }
        );

        const emailResult = await emailResponse.json();
        if (import.meta.env.MODE === 'development') {
          console.log('Résultat envoi email:', emailResult);
        }
        trackEvent('email_dispatch', { form: 'contact', status: 'success' });
      } catch (emailError) {
        console.error('Erreur envoi email (non bloquant):', emailError);
        trackEvent('email_dispatch', { form: 'contact', status: 'error' });
      }

      setSubmitStatus('success');
      trackEvent('form_submit_success', { form: 'contact' });
      setFormData({
        name: '',
        firstName: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
        files: []
      });
    } catch (error) {
      console.error('Erreur soumission formulaire:', error);
      trackEvent('form_submit_error', { form: 'contact' });
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInteractionCount((c) => c + 1);
  };

  const handleProjectUpdate = (projectDescription: string) => {
    setFormData({ ...formData, message: projectDescription });
  };

  return (
    <section
      id="contact-form"
      className="reveal py-32 px-6 lg:px-12 max-w-[1400px] mx-auto bg-white"
      aria-labelledby="contact-title"
    >
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="text-center mb-16 reveal">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted">
            Contact
          </span>
        </div>
        <h2
          id="contact-title"
          className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-text-main leading-[0.95]"
        >
          Parlons de votre projet
        </h2>
        <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto mt-4">
          Prêt à donner vie à vos idées créatives ? Partagez votre vision,
          nous revenons vers vous sous 24h.
        </p>
      </div>

      {/* ── GRILLE FORM + INFOS ──────────────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 reveal delay-100">
        {/* ── FORMULAIRE ─────────────────────────────────────────────────── */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
          />

          {/* Nom */}
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-text-main mb-2 font-display">
              Nom complet <span className="text-text-muted">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-black transition-colors duration-200"
              placeholder="Votre nom"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-text-main mb-2 font-display">
              Email <span className="text-text-muted">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-black transition-colors duration-200"
              placeholder="votre@email.com"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Service souhaité */}
          <div>
            <label htmlFor="contact-service" className="block text-sm font-medium text-text-main mb-2 font-display">
              Service souhaité <span className="text-text-muted">*</span>
            </label>
            <div className="relative">
              <select
                id="contact-service"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-text-main appearance-none pr-12 cursor-pointer focus:outline-none focus:border-black transition-colors duration-200"
                required
                disabled={isSubmitting}
              >
                <option value="">Sélectionner un service</option>
                <option value="production_audiovisuelle">Production Audiovisuelle</option>
                <option value="design_identite_visuelle">Design & Identité Visuelle</option>
                <option value="motion_design">Motion Design</option>
                <option value="photographie">Photographie</option>
                <option value="automatisation_ia">Automatisation & IA</option>
                <option value="autre">Autre</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-text-main mb-2 font-display">
              Message <span className="text-text-muted">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-black transition-colors duration-200 min-h-[140px] resize-y"
              placeholder="Décrivez votre projet et vos objectifs..."
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Success */}
          {submitStatus === 'success' && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center" role="status" aria-live="polite">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-emerald-700 font-semibold">Demande envoyée avec succès !</span>
              </div>
              <p className="text-emerald-600 text-sm">
                Nous revenons vers vous sous 24h maximum.
              </p>
            </div>
          )}

          {/* Error */}
          {submitStatus === 'error' && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-center" role="alert" aria-live="assertive">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                <span className="text-rose-600 font-semibold">Erreur lors de l'envoi</span>
              </div>
              <p className="text-rose-500 text-sm">
                {errorMessage || "Une erreur est survenue lors de l'envoi de votre demande."}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-black text-white rounded-full px-8 py-4 text-sm font-medium font-display transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02] shadow-lg disabled:opacity-60 disabled:shadow-none disabled:hover:scale-100"
            onClick={() => { if (!isSubmitting) trackEvent('conversion_cta_click', { form: 'contact' }); }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Envoi en cours...
              </span>
            ) : (
              <>
                Envoyer ma demande
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </>
            )}
          </button>

          <p className="flex items-center justify-center gap-2 text-xs text-text-muted">
            <ShieldCheck className="h-3.5 w-3.5" />
            Vos données sont sécurisées et ne seront jamais partagées
          </p>
        </form>

        {/* ── SIDEBAR — Infos de contact ─────────────────────────────────── */}
        <div className="space-y-6">
          {/* Email */}
          <div className="group rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:border-black hover:bg-black hover:text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-white">
                <span className="material-symbols-outlined text-xl text-black">mail</span>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-text-muted transition-colors duration-300 group-hover:text-gray-400 mb-1">
                  Email
                </p>
                <a
                  href="mailto:contact@gndconsulting.fr"
                  className="text-sm font-semibold font-display no-underline text-text-main transition-colors duration-300 group-hover:text-white"
                >
                  contact@gndconsulting.fr
                </a>
              </div>
            </div>
          </div>

          {/* Téléphone */}
          <div className="group rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:border-black hover:bg-black hover:text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-white">
                <span className="material-symbols-outlined text-xl text-black">phone</span>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-text-muted transition-colors duration-300 group-hover:text-gray-400 mb-1">
                  Téléphone
                </p>
                <a
                  href="tel:+33759506322"
                  className="text-sm font-semibold font-display no-underline text-text-main transition-colors duration-300 group-hover:text-white"
                >
                  07 59 50 63 22
                </a>
              </div>
            </div>
          </div>

          {/* Adresse */}
          <div className="group rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:border-black hover:bg-black hover:text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-white">
                <span className="material-symbols-outlined text-xl text-black">location_on</span>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-text-muted transition-colors duration-300 group-hover:text-gray-400 mb-1">
                  Adresse
                </p>
                <p className="text-sm font-semibold font-display text-text-main transition-colors duration-300 group-hover:text-white">
                  Paris, France
                </p>
              </div>
            </div>
          </div>

          {/* Calendly */}
          <div className="rounded-2xl border border-gray-200 bg-background-alt p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                <span className="material-symbols-outlined text-lg text-white">calendar_month</span>
              </div>
              <div>
                <p className="text-sm font-semibold font-display text-text-main">Planifier un appel</p>
                <p className="text-xs text-text-muted">30 min, sans engagement</p>
              </div>
            </div>
            <a
              href="https://calendly.com/gnd63consulting/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-black text-white rounded-full px-6 py-3 text-sm font-medium font-display transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02] no-underline"
            >
              Réserver un créneau
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </a>
          </div>

          {/* Aide IA */}
          <button
            type="button"
            onClick={() => setIsAIChatOpen(true)}
            className="w-full rounded-2xl border border-dashed border-gray-300 p-5 text-center transition-all duration-300 hover:border-black hover:bg-gray-50"
          >
            <span className="material-symbols-outlined text-2xl text-text-muted mb-2 block">smart_toy</span>
            <p className="text-sm font-medium font-display text-text-main">Besoin d'aide ?</p>
            <p className="text-xs text-text-muted mt-1">Parlez à notre assistant IA</p>
          </button>
        </div>
      </div>

      <AIChat
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        onProjectUpdate={handleProjectUpdate}
      />

      {showFAQ && (
        <FAQ
          headingOverride="Questions fréquentes"
          containerClassName="mt-24"
        />
      )}
    </section>
  );
}
