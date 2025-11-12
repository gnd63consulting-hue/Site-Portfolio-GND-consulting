import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gublhtivvydkuooooffg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key-for-development';

console.log('🔍 Configuration Supabase:');
console.log('📡 URL:', supabaseUrl);
console.log('🔑 Anon Key:', supabaseAnonKey ? '✅ Présente' : '❌ Manquante');

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Clé API Supabase manquante - Mode développement avec données statiques');
  console.warn('📝 Pour activer Supabase, ajoutez VITE_SUPABASE_ANON_KEY dans .env.local');
}

// Créer le client Supabase avec une clé factice pour éviter les erreurs 401
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonction pour obtenir l'URL publique d'un fichier Supabase Storage avec encodage sécurisé
export const getSupabaseFileUrl = (bucket: string, filePath: string): string => {
  try {
    // Encoder le chemin du fichier pour gérer les espaces et caractères spéciaux
    const encodedFilePath = encodeURIComponent(filePath);
    const { data } = supabase.storage.from(bucket).getPublicUrl(encodedFilePath);
    
    if (import.meta.env.MODE === 'development') {
      // eslint-disable-next-line no-console
      console.log('🔗 URL Supabase générée:', {
        originalPath: filePath,
        encodedPath: encodedFilePath,
        finalUrl: data.publicUrl
      });
    }
    
    return data.publicUrl;
  } catch (error) {
    console.error('❌ Erreur lors de la génération de l\'URL Supabase:', error);
    return '';
  }
};

// Fonction pour vérifier si un fichier existe dans le storage
export const checkFileExists = async (bucket: string, filePath: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.storage.from(bucket).list('', {
      search: filePath
    });
    return !error && data && data.length > 0;
  } catch {
    return false;
  }
};

// Types pour TypeScript
export interface Contact {
  id?: string;
  nom: string;
  email: string;
  telephone?: string;
  entreprise?: string;
  type_projet: string;
  budget?: string;
  delai_souhaite?: string;
  message: string;
  statut?: string;
  score_qualification?: number;
  created_at?: string;
}

export interface Project {
  id: string;
  titre: string;
  description?: string;
  type_projet: string;
  cover_url?: string;
  video_demo_url?: string;
  youtube_url?: string;
  video_type?: 'local' | 'youtube' | 'vimeo';
  video_source?: string;
  featured?: boolean;
  public?: boolean;
  created_at?: string;
}

export interface Service {
  id: string;
  nom: string;
  description_courte?: string;
  description_complete?: string;
  categorie: string;
  tarif_min?: number;
  tarif_max?: number;
  actif?: boolean;
  featured?: boolean;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  nom_client: string;
  fonction?: string;
  entreprise?: string;
  citation: string;
  note?: number;
  photo_client_url?: string;
  featured?: boolean;
  public?: boolean;
  created_at?: string;
}

export interface AIConversation {
  id?: string;
  session_id?: string;
  message_user: string;
  reponse_ai: string;
  intention_detectee?: string;
  sentiment?: string;
  niveau_interet?: number;
  lead_potentiel?: boolean;
  created_at?: string;
}