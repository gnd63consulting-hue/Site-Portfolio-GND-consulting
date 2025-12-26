import React, { useState } from 'react';
import {
  MessageCircle,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Mail,
  Smartphone,
  Building2,
  User,
  CalendarDays,
  Coins,
  Briefcase,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { AIChat } from './AIChat';
import { FAQ } from './FAQ';
import { useContacts } from '../hooks/useSupabase';
import { supabase } from '../lib/supabase';
import { trackEvent } from '../utils/analytics';

interface ContactProps {
  themeColor?: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  showFAQ?: boolean;
}

export function Contact({ themeColor, showFAQ = true }: ContactProps = {}) {
  const defaultTheme = {
    primary: '#ec4899',
    secondary: '#f472b6',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
  };

  const theme = themeColor || defaultTheme;
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
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot
  const [interactionCount, setInteractionCount] = useState(0);
  const [formOpenedAt] = useState<number>(() => Date.now());

  // Validation des champs
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
      setErrorMessage('Le type de projet est obligatoire');
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Le message est obligatoire');
      return false;
    }
    // Anti-spam: exige une interaction minimale et un temps passé sur le formulaire
    const elapsedMs = Date.now() - formOpenedAt;
    if (interactionCount < 2 || elapsedMs < 3000) {
      setErrorMessage('Veuillez compléter le formulaire normalement avant envoi.');
      return false;
    }
    if (formData.phone && !/^[\d\s\-\+\(\)\.]{8,}$/.test(formData.phone)) {
      setErrorMessage('Format de téléphone invalide');
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Protection anti-spam
    if (honeypot) {
      if (import.meta.env.MODE === 'development') {
        // eslint-disable-next-line no-console
        console.log('Tentative de spam détectée');
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validation
    if (!validateForm()) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    try {
      trackEvent('form_submit_attempt', { form: 'contact' });
      // Préparer les données pour Supabase
      const fullName = formData.firstName 
        ? `${formData.firstName} ${formData.name}`.trim()
        : formData.name;
        
      const contactData = {
        nom: fullName,
        email: formData.email,
        telephone: formData.phone || null,
        entreprise: formData.company || null,
        type_projet: formData.projectType,
        budget: formData.budget || null,
        delai_souhaite: formData.timeline || null,
        message: formData.message,
        fichiers_joints: formData.files.length > 0 ? 
          formData.files.map(f => ({ name: f.name, size: f.size, type: f.type })) : 
          null
      };

      // 1. Enregistrer dans Supabase
      const result = await addContact(contactData);
      
      if (!result.success) {
        throw new Error('Erreur lors de l\'enregistrement en base');
      }

      // 2. Envoyer l'email de notification
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
          // eslint-disable-next-line no-console
          console.log('Résultat envoi email:', emailResult);
        }
        trackEvent('email_dispatch', { form: 'contact', status: 'success' });
      } catch (emailError) {
        console.error('Erreur envoi email (non bloquant):', emailError);
        trackEvent('email_dispatch', { form: 'contact', status: 'error' });
        // L'erreur d'email n'empêche pas le succès du formulaire
      }

      // 3. Succès
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setInteractionCount((c) => c + 1);
  };

  const handleProjectUpdate = (projectDescription: string) => {
    setFormData({
      ...formData,
      message: projectDescription
    });
  };

  // Gestion des fichiers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/', 'application/pdf', 'text/', 'application/msword', 'application/vnd.openxmlformats'];
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setErrorMessage(`Le fichier ${file.name} est trop volumineux (max 10MB)`);
        return false;
      }
      if (!allowedTypes.some(type => file.type.startsWith(type))) {
        setErrorMessage(`Le fichier ${file.name} n'est pas d'un type autorisé`);
        return false;
      }
      return true;
    });
    
    setFormData({ ...formData, files: [...formData.files, ...validFiles] });
  };

  const removeFile = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: newFiles });
  };

  const baseFieldClasses = 'w-full px-4 py-3.5 rounded-2xl border border-slate-200/60 bg-white/85 text-slate-900 font-inter text-sm sm:text-base shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-all duration-300 focus:outline-none focus:border-blue-400/70 focus:ring-2 focus:ring-blue-200/70 focus:ring-offset-2 focus:ring-offset-white placeholder:text-slate-400/80 backdrop-blur-xl hover:border-blue-200/80 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-white/70';
  const selectFieldClasses = `${baseFieldClasses} appearance-none pr-12 cursor-pointer`;
  const textAreaClasses = `${baseFieldClasses} min-h-[140px] sm:min-h-[160px] leading-relaxed resize-none`;

  return (
    <section id="contact-form" className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 max-w-[900px] mx-auto relative contact-section-wrapper" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f9ff 100%)' }}>
      {/* Effet de particules */}
      <div className="absolute inset-0 opacity-25">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Éléments décoratifs colorés */}
      <div className="absolute top-6 -left-12 h-40 w-40 sm:top-16 sm:-left-20 sm:h-72 sm:w-72 bg-gradient-to-br from-blue-300/45 to-blue-200/35 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-8 -right-10 h-48 w-48 sm:bottom-16 sm:-right-20 sm:h-96 sm:w-96 bg-gradient-to-br from-blue-500/25 to-blue-400/20 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute top-1/2 left-1/4 h-44 w-44 sm:left-1/3 sm:h-64 sm:w-64 bg-gradient-to-br from-slate-900/10 to-blue-300/25 rounded-full blur-xl sm:blur-2xl" />

      <div className="text-center mb-8 sm:mb-12 md:mb-16 px-2 contact-header-wrapper">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-4 sm:mb-6 uppercase tracking-tight contact-form-title text-slate-900" id="contact">
          Contactez-Nous
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto px-2 contact-form-subtitle">
          Prêt à donner vie à vos projets créatifs ? Échangeons sur vos besoins et transformons vos idées en réalité
        </p>
      </div>
      <div className="relative z-10 max-w-[960px] mx-auto flex flex-col gap-12 items-center px-2 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="contact-form-main relative w-full max-w-[820px] overflow-hidden rounded-2xl border border-slate-200/40 bg-white/75 shadow-[0_40px_90px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/40 to-white/75" />
          <div className="pointer-events-none absolute inset-x-6 -top-16 h-32 rounded-full bg-white/30 blur-3xl" />

          {/* Honeypot anti-spam (caché) */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
          />

          <div className="relative z-10 grid gap-6 p-6 sm:p-8 md:p-10 form-inner w-full">
            <div className="flex flex-col gap-2 text-center sm:text-left items-center sm:items-start">
              <span className="badge-title inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                <Sparkles className="h-4 w-4 text-blue-400" />
                Formulaire
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                Discutons de votre projet
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[32rem]">
                Partagez vos besoins en quelques lignes. Nous analysons chaque demande avec un expert dédié avant de vous répondre.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                  <User className="h-4 w-4" />
                </span>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`${baseFieldClasses} pl-12`}
                  placeholder="Prénom (optionnel)"
                  disabled={isSubmitting}
                />
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                  <User className="h-4 w-4" />
                </span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${baseFieldClasses} pl-12`}
                  placeholder="Votre nom *"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid="false"
                  className={`${baseFieldClasses} pl-12`}
                  placeholder="Votre e-mail *"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                  <Smartphone className="h-4 w-4" />
                </span>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${baseFieldClasses} pl-12`}
                  placeholder="Téléphone (optionnel)"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                <Building2 className="h-4 w-4" />
              </span>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`${baseFieldClasses} pl-12`}
                placeholder="Entreprise (optionnel)"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                  <Briefcase className="h-4 w-4" />
                </span>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`${selectFieldClasses} pl-12`}
                  required
                  disabled={isSubmitting}
                  aria-label="Type de projet"
                >
                  <option value="">Type de projet *</option>
                  <option value="production_audiovisuelle">Production Audiovisuelle</option>
                  <option value="design_graphique">Design Graphique</option>
                  <option value="motion_design">Motion Design</option>
                  <option value="site_web">Site Web</option>
                  <option value="strategie_digitale">Stratégie Digitale</option>
                  <option value="pack_complet">Pack Complet</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                  <Coins className="h-4 w-4" />
                </span>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`${selectFieldClasses} pl-12`}
                  disabled={isSubmitting}
                >
                  <option value="">Budget estimé</option>
                  <option value="< 2k€">&lt; 2k€</option>
                  <option value="2k-5k€">2k-5k€</option>
                  <option value="5k-10k€">5k-10k€</option>
                  <option value="10k-20k€">10k-20k€</option>
                  <option value="20k+€">20k+€</option>
                  <option value="À discuter">À discuter</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                <CalendarDays className="h-4 w-4" />
              </span>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className={`${selectFieldClasses} pl-12`}
                disabled={isSubmitting}
              >
                <option value="">Délai souhaité</option>
                <option value="Urgent (<1 semaine)">Urgent (&lt;1 semaine)</option>
                <option value="1-2 semaines">1-2 semaines</option>
                <option value="1 mois">1 mois</option>
                <option value="2-3 mois">2-3 mois</option>
                <option value="Flexible">Flexible</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/85 px-4 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="file-upload"
                  className="file-upload-label group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-500 text-white shadow-lg shadow-blue-500/25">
                      <Upload className="w-5 h-5" />
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-800">Joindre des fichiers (optionnel)</p>
                      <p className="text-xs text-slate-400">PDF, images, briefs… max 10 Mo</p>
                    </div>
                  </div>
                  <span className="text-[0.6rem] sm:text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Glisser-déposer
                  </span>
                </label>

                {formData.files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                          <span className="text-blue-500 text-base leading-none">📎</span>
                          <span className="font-medium text-slate-700">{file.name}</span>
                          <span className="text-slate-400 text-xs">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:bg-slate-200 disabled:opacity-50"
                          disabled={isSubmitting}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-4 text-blue-400">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`${textAreaClasses} pl-12 pt-4`}
                  placeholder="Décrivez votre projet et vos objectifs... *"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="button"
                onClick={() => setIsAIChatOpen(true)}
                className="ai-trigger inline-flex items-center gap-2 self-stretch sm:self-start justify-center rounded-full border border-blue-200 bg-blue-50/60 px-4 py-2.5 text-xs sm:text-sm font-semibold text-blue-600 shadow-[0_14px_40px_rgba(14,165,233,0.2)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:text-blue-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                <MessageCircle className="w-4 h-4" />
                Besoin d'aide ? Parlez à notre IA
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className="rounded-2xl border border-emerald-300/40 bg-emerald-50/85 px-5 py-4 text-center shadow-[0_18px_48px_rgba(16,185,129,0.22)]" role="status" aria-live="polite">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  <h3 className="text-emerald-700 font-semibold" style={{ fontSize: 'clamp(0.95rem, 3vw, 1.125rem)', wordBreak: 'break-word' }}>
                    Demande envoyée avec succès !
                  </h3>
                </div>
                <p className="text-emerald-600" style={{ fontSize: 'clamp(0.8rem, 2.4vw, 1rem)', wordBreak: 'break-word' }}>
                  🎉 Merci ! Votre demande a bien été enregistrée et envoyée.
                </p>
                <p className="text-emerald-500" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', wordBreak: 'break-word' }}>
                  Nous revenons vers vous sous 2h maximum par email ou téléphone.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="rounded-2xl border border-rose-300/50 bg-rose-50/85 px-5 py-4 text-center shadow-[0_18px_48px_rgba(244,63,94,0.18)]" role="alert" aria-live="assertive">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
                  <AlertCircle className="w-6 h-6 text-rose-500" />
                  <h3 className="text-rose-600 font-semibold" style={{ fontSize: 'clamp(0.95rem, 3vw, 1.125rem)', wordBreak: 'break-word' }}>
                    Erreur lors de l'envoi
                  </h3>
                </div>
                <p className="text-rose-500" style={{ fontSize: 'clamp(0.8rem, 2.4vw, 1rem)', wordBreak: 'break-word' }}>
                  {errorMessage || "Une erreur est survenue lors de l'envoi de votre demande."}
                </p>
                <p className="text-rose-500/90" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', wordBreak: 'break-word' }}>
                  Veuillez réessayer ou nous contacter directement à gnd63consulting@gmail.com
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="cta-submit relative mt-2 inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#2563eb] px-5 py-4 text-base sm:text-lg font-bold uppercase tracking-[0.32em] text-white shadow-[0_24px_45px_rgba(15,23,42,0.18)] transition-all duration-300 hover:bg-[#1d4ed8] hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.2)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#bfdbfe] disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
              onClick={() => { if (!isSubmitting) trackEvent('conversion_cta_click', { form: 'contact' }); }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3 tracking-normal">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"></div>
                  Envoi en cours...
                </span>
              ) : (
                'Recevoir mon devis gratuit'
              )}
            </button>

            <div className="grid gap-2 rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-xs sm:text-sm text-slate-500 shadow-[0_16px_45px_rgba(15,23,42,0.12)]">
              <p className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                <span>Vos données sont sécurisées et ne seront jamais partagées</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span>Réponse garantie sous 2h en jours ouvrés</span>
              </p>
            </div>
          </div>
        </form>

      </div>

      
      <AIChat
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        onProjectUpdate={handleProjectUpdate}
      />

      {showFAQ && (
        <FAQ
          headingOverride="Questions fréquentes"
          containerClassName="mt-16"
        />
      )}

      {/* Mobile-specific responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .contact-section-wrapper {
            padding: 1.5rem 1rem !important;
            max-width: 100% !important;
          }

          .contact-header-wrapper {
            margin-bottom: 1.5rem !important;
            padding: 0 0.5rem !important;
          }

          .contact-form-title {
            font-size: 1.125rem !important;
            margin-bottom: 0.75rem !important;
          }

          .contact-form-subtitle {
            font-size: 0.875rem !important;
            line-height: 1.4 !important;
            padding: 0 !important;
          }

          .contact-form-main {
            width: 100% !important;
            max-width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            border-radius: 1.125rem !important;
          }

          .contact-form-main .form-inner {
            padding: 1.5rem !important;
            gap: 1.25rem !important;
            border-radius: 0.75rem !important;
          }

          .contact-form-main input,
          .contact-form-main select,
          .contact-form-main textarea {
            width: 100% !important;
            min-height: 2.75rem !important;
            padding: 0.875rem 1rem !important;
            font-size: 0.875rem !important;
            border-radius: 1rem !important;
            line-height: 1.4 !important;
          }

          .contact-form-main textarea {
            min-height: 8rem !important;
            padding: 1rem !important;
          }

          .contact-form-main .grid-cols-1.sm\\:grid-cols-2 {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }

          .contact-form-main label[for=\"file-upload\"] {
            min-height: 3rem !important;
            padding: 0.875rem !important;
            font-size: 0.875rem !important;
          }

          .contact-form-main button[type=\"submit\"] {
            width: 100% !important;
            min-height: 3rem !important;
            padding: 1rem !important;
            font-size: 0.875rem !important;
            border-radius: 0.9rem !important;
            margin-top: 0.5rem !important;
          }

          .contact-form-main .ai-trigger {
            width: 100% !important;
            padding: 0.75rem 1rem !important;
            font-size: 0.75rem !important;
            justify-content: center !important;
            margin-top: 0.5rem !important;
          }

          .contact-form-main [role=\"status\"],
          .contact-form-main [role=\"alert\"] {
            padding: 1rem !important;
            margin-bottom: 1rem !important;
            border-radius: 0.9rem !important;
          }

          .contact-form-main .text-center.text-xs,
          .contact-form-main .text-center.text-xs span {
            font-size: 0.75rem !important;
          }

          .contact-form-main .space-y-2 > div {
            padding: 0.75rem !important;
            font-size: 0.75rem !important;
          }
        }

        @media (max-width: 640px) {
          .contact-section-wrapper {
            padding: 1rem 0.5rem !important;
          }

          .contact-form-main {
            padding: 1rem !important;
          }

          .contact-form-main input,
          .contact-form-main select,
          .contact-form-main textarea {
            font-size: 0.8125rem !important;
          }
        }

        @media (max-width: 540px) {
          .contact-form-main .form-inner {
            padding: 1.25rem !important;
            gap: 1rem !important;
          }

          .contact-form-main .form-inner .grid {
            gap: 0.8rem !important;
          }

          .badge-title {
            letter-spacing: 0.22em !important;
            font-size: 0.65rem !important;
          }

          .file-upload-label > span:last-child {
            align-self: flex-start;
            letter-spacing: 0.22em !important;
          }

          .file-upload-label .space-y-1 p:first-child {
            font-size: 0.875rem !important;
          }

          .cta-submit {
            font-size: 0.88rem !important;
            letter-spacing: 0.24em !important;
            padding: 0.9rem 1rem !important;
            border-radius: 0.85rem !important;
          }

          .contact-form-main .ai-trigger {
            font-size: 0.7rem !important;
          }

          .contact-form-main .space-y-2 > div {
            font-size: 0.72rem !important;
          }
        }
      `}</style>
    </section>
  );
}
