import { useState, useEffect } from 'react';
import { supabase, type Contact, type Project, type Service, type Testimonial } from '../lib/supabase';

// Hook pour les contacts
export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addContact = async (contactData: Omit<Contact, 'id' | 'created_at'>) => {
    try {
      if (import.meta.env.MODE === 'development') {
        // eslint-disable-next-line no-console
        console.log('📝 Enregistrement contact en base:', contactData);
      }
      
      // Nettoyer les données pour éviter les problèmes RLS
      const cleanData = {
        nom: contactData.nom,
        email: contactData.email,
        telephone: contactData.telephone || null,
        entreprise: contactData.entreprise || null,
        type_projet: contactData.type_projet,
        budget: contactData.budget || null,
        delai_souhaite: contactData.delai_souhaite || null,
        message: contactData.message,
        fichiers_joints: contactData.fichiers_joints || null
      };
      
      if (import.meta.env.MODE === 'development') {
        // eslint-disable-next-line no-console
        console.log('🧹 Données nettoyées:', cleanData);
      }
      
      const { data, error } = await supabase
        .from('contacts')
        .insert(cleanData);

      if (error) throw error;
      
      if (import.meta.env.MODE === 'development') {
        // eslint-disable-next-line no-console
        console.log('✅ Contact enregistré avec succès');
      }
      return { success: true, data: cleanData };
    } catch (err) {
      console.error('Erreur ajout contact:', err);
      return { success: false, error: err };
    }
  };

  return { contacts, loading, error, addContact };
}

// Hook pour les projets
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      console.log('🔄 Début du chargement des vidéos...');
      setLoading(true);
      
      try {
        console.log('📡 Requête Supabase en cours...');
        
        // Test de connexion d'abord
        console.log('🔍 Test de connexion Supabase...');
        const { data: testData, error: testError } = await supabase
          .from('projects')
          .select('id')
          .limit(1);
        
        console.log('🧪 Test de connexion - Données:', testData);
        console.log('🧪 Test de connexion - Erreur:', testError);
        
        if (testError) {
          console.error('❌ Erreur de connexion Supabase:', testError);
          console.log('🔄 Utilisation des données statiques...');
          
          // Utiliser les données statiques en cas d'erreur
          const staticProjects = [
            {
              id: 'static-1',
              titre: 'Vidéo Test GND',
              description: 'Vidéo de démonstration hébergée sur Supabase',
              type_projet: 'production_audiovisuelle',
              video_demo_url: 'Miel test website.mov',
              video_type: 'supabase_storage',
              video_source: 'supabase_storage',
              public: true,
              featured: true,
              cover_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
              created_at: new Date().toISOString()
            }
          ];
          
          console.log('📦 Données statiques utilisées:', staticProjects);
          setProjects(staticProjects);
          return;
        }
        
        // Si la connexion fonctionne, faire la vraie requête
        const { data, error } = await supabase
          .from('projects')
          .select(`
            id,
            titre,
            description,
            type_projet,
            cover_url,
            video_demo_url,
            youtube_url,
            video_type,
            video_source,
            featured,
            public,
            created_at
          `)
          .eq('public', true)
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });
        
        console.log('📦 Données reçues:', data);
        console.log('❌ Erreur:', error);
        
        if (error) {
          console.error('❌ Erreur Supabase:', error);
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.warn('⚠️ Aucune vidéo trouvée');
          setProjects([]);
          return;
        }
        
        console.log(`✅ ${data.length} vidéos chargées avec succès`);
        setProjects(data);
        
      } catch (err) {
        console.error('💥 Erreur fatale:', err);
        console.log('🔄 Fallback vers données statiques...');
        
        // Fallback vers données statiques
        const staticProjects = [
          {
            id: 'static-1',
            titre: 'Vidéo Test GND',
            description: 'Vidéo de démonstration hébergée sur Supabase',
            type_projet: 'production_audiovisuelle',
            video_demo_url: 'Miel test website.mov',
            video_type: 'supabase_storage',
            video_source: 'supabase_storage',
            public: true,
            featured: true,
            cover_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
            created_at: new Date().toISOString()
          }
        ];
        
        console.log('📦 Données statiques utilisées (fallback):', staticProjects);
        setProjects(staticProjects);
        setError(null); // Pas d'erreur avec les données statiques
      } finally {
        console.log('🏁 Chargement terminé');
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

// Hook pour les services
export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        console.log('🔄 Chargement des services...');
        
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('actif', true)
          .order('featured', { ascending: false })
          .order('ordre_affichage', { ascending: true });

        if (error) {
          console.error('❌ Erreur services:', error);
          console.log('🔄 Utilisation des services statiques...');
          
          // Services statiques en cas d'erreur
          const staticServices = [
            {
              id: 'static-service-1',
              nom: 'Production Audiovisuelle',
              description_courte: 'Création de contenus vidéo professionnels',
              description_complete: 'Nous créons des contenus vidéo de qualité professionnelle pour tous vos besoins.',
              categorie: 'audiovisuel',
              actif: true,
              featured: true,
              ordre_affichage: 1,
              created_at: new Date().toISOString()
            }
          ];
          
          setServices(staticServices);
          return;
        }
        
        console.log('✅ Services chargés:', data);
        setServices(data || []);
      } catch (err) {
        console.error('💥 Erreur fatale services:', err);
        console.log('🔄 Fallback vers services statiques...');
        
        // Fallback vers services statiques
        const staticServices = [
          {
            id: 'static-service-1',
            nom: 'Production Audiovisuelle',
            description_courte: 'Création de contenus vidéo professionnels',
            description_complete: 'Nous créons des contenus vidéo de qualité professionnelle pour tous vos besoins.',
            categorie: 'audiovisuel',
            actif: true,
            featured: true,
            ordre_affichage: 1,
            created_at: new Date().toISOString()
          }
        ];
        
        setServices(staticServices);
        setError(null);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}

// Hook pour les témoignages
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        console.log('🔄 Chargement des témoignages...');
        
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('public', true)
          .eq('utilise_site', true)
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) {
          console.error('❌ Erreur témoignages:', error);
          console.log('🔄 Utilisation des témoignages statiques...');
          
          // Témoignages statiques en cas d'erreur
          const staticTestimonials = [
            {
              id: 'static-testimonial-1',
              nom_client: 'Client GND',
              fonction: 'Directeur Marketing',
              entreprise: 'Entreprise Test',
              citation: 'Excellent travail de l\'équipe GND Consulting !',
              note: 5,
              featured: true,
              public: true,
              utilise_site: true,
              created_at: new Date().toISOString()
            }
          ];
          
          setTestimonials(staticTestimonials);
          return;
        }
        
        console.log('✅ Témoignages chargés:', data);
        setTestimonials(data || []);
      } catch (err) {
        console.error('💥 Erreur fatale témoignages:', err);
        console.log('🔄 Fallback vers témoignages statiques...');
        
        // Fallback vers témoignages statiques
        const staticTestimonials = [
          {
            id: 'static-testimonial-1',
            nom_client: 'Client GND',
            fonction: 'Directeur Marketing',
            entreprise: 'Entreprise Test',
            citation: 'Excellent travail de l\'équipe GND Consulting !',
            note: 5,
            featured: true,
            public: true,
            utilise_site: true,
            created_at: new Date().toISOString()
          }
        ];
        
        setTestimonials(staticTestimonials);
        setError(null);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}