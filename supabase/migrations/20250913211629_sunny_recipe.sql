/*
  # Nettoyage complet et ajout de la vidéo Supabase

  1. Nettoyage
    - Suppression de tous les projets existants
    - Nettoyage des contraintes

  2. Ajout vidéo
    - Insertion de Mieltestwebsite.mov
    - Configuration Supabase Storage
    - Projet featured et public
*/

-- Nettoyer la table
DELETE FROM projects;

-- Vérifier et mettre à jour les contraintes si nécessaire
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

  -- Créer la nouvelle contrainte avec supabase_storage
  ALTER TABLE projects ADD CONSTRAINT projects_video_type_check 
  CHECK (video_type IN ('local', 'youtube', 'vimeo', 'cloudinary', 'supabase_storage'));
END $$;

-- Insérer la vidéo de test
INSERT INTO projects (
  titre,
  description,
  type_projet,
  cover_url,
  video_demo_url,
  video_type,
  video_source,
  featured,
  public,
  statut
) VALUES (
  'Vidéo Test GND - Miel',
  'Vidéo de démonstration hébergée sur Supabase Storage pour tester l''intégration vidéo.',
  'clip_promotionnel',
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
  'Mieltestwebsite.mov',
  'supabase_storage',
  'supabase_storage',
  true,
  true,
  'livre'
);

-- Vérifier l'insertion
SELECT 
  id,
  titre,
  video_demo_url,
  video_type,
  video_source,
  featured,
  public
FROM projects 
WHERE video_type = 'supabase_storage';