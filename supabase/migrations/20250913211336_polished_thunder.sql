/*
  # Corriger les contraintes et ajouter la vidéo Supabase

  1. Mise à jour des contraintes
    - Ajouter 'supabase_storage' aux valeurs autorisées pour video_type
    - Mettre à jour la contrainte video_source si nécessaire
  
  2. Insertion de la vidéo test
    - Utiliser des valeurs compatibles avec les contraintes existantes
    - Configurer correctement pour Supabase Storage
*/

-- Nettoyer les anciens tests
DELETE FROM projects WHERE titre LIKE '%Test%' OR titre LIKE '%Démo%' OR titre LIKE '%Miel%';

-- Vérifier et mettre à jour la contrainte video_type pour inclure supabase_storage
DO $$
BEGIN
  -- Supprimer l'ancienne contrainte si elle existe
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'projects_video_type_check' 
    AND table_name = 'projects'
  ) THEN
    ALTER TABLE projects DROP CONSTRAINT projects_video_type_check;
  END IF;
  
  -- Ajouter la nouvelle contrainte avec supabase_storage
  ALTER TABLE projects ADD CONSTRAINT projects_video_type_check 
    CHECK (video_type IN ('local', 'youtube', 'vimeo', 'cloudinary', 'supabase_storage'));
END $$;

-- Ajouter la vidéo de test Supabase avec des valeurs valides
INSERT INTO projects (
  titre,
  description,
  type_projet,
  video_demo_url,
  video_type,
  video_source,
  featured,
  public,
  statut,
  ordre_affichage,
  cover_url
) VALUES (
  'Vidéo de Test GND - Miel',
  'Vidéo de démonstration hébergée sur Supabase Storage pour tester l''intégration vidéo native.',
  'captation_evenement',
  'Mieltestwebsite.mov',
  'supabase_storage',
  'supabase_storage',
  true,
  true,
  'livre',
  1,
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
);

-- Vérifier l'insertion
SELECT 
  titre,
  video_demo_url,
  video_type,
  video_source,
  featured,
  public
FROM projects 
WHERE titre = 'Vidéo de Test GND - Miel';