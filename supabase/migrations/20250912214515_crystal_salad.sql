/*
  # Correction de l'intégration YouTube

  1. Corrections
    - Ajouter les colonnes manquantes si elles n'existent pas
    - Corriger les contraintes
    - Ajouter des données de test
    - Vérifier les index
*/

-- Ajouter les colonnes si elles n'existent pas déjà
DO $$ 
BEGIN
  -- Ajouter youtube_url si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'youtube_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN youtube_url text;
    COMMENT ON COLUMN projects.youtube_url IS 'URL complète de la vidéo YouTube (ex: https://www.youtube.com/watch?v=VIDEO_ID)';
  END IF;

  -- Ajouter video_type si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'video_type'
  ) THEN
    ALTER TABLE projects ADD COLUMN video_type character varying(20) DEFAULT 'local';
    COMMENT ON COLUMN projects.video_type IS 'Type de vidéo: local, youtube, ou vimeo';
  END IF;
END $$;

-- Ajouter les contraintes si elles n'existent pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints 
    WHERE constraint_name = 'projects_video_type_check'
  ) THEN
    ALTER TABLE projects ADD CONSTRAINT projects_video_type_check 
    CHECK (video_type IN ('local', 'youtube', 'vimeo'));
  END IF;
END $$;

-- Créer l'index pour les vidéos YouTube si il n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_projects_youtube'
  ) THEN
    CREATE INDEX idx_projects_youtube ON projects(youtube_url) WHERE youtube_url IS NOT NULL;
  END IF;
END $$;

-- Supprimer les anciennes données de test si elles existent
DELETE FROM projects WHERE titre = 'Vidéo de Démonstration' AND youtube_url IS NOT NULL;

-- Insérer la vidéo de test
INSERT INTO projects (
  titre,
  description,
  type_projet,
  youtube_url,
  video_type,
  statut,
  featured,
  public,
  ordre_affichage
) VALUES (
  'Vidéo de Démonstration GND',
  'Vidéo de test pour démontrer l''intégration YouTube dans le portfolio. Cette vidéo montre nos capacités de production audiovisuelle.',
  'captation_evenement',
  'https://www.youtube.com/watch?v=UbXQim7iNLI',
  'youtube',
  'livre',
  true,
  true,
  1
);

-- Ajouter quelques autres exemples pour tester
INSERT INTO projects (
  titre,
  description,
  type_projet,
  youtube_url,
  video_type,
  statut,
  featured,
  public,
  ordre_affichage
) VALUES (
  'Production Audiovisuelle Premium',
  'Exemple de notre travail en production audiovisuelle avec qualité cinématographique.',
  'video_corporate',
  'https://www.youtube.com/watch?v=UbXQim7iNLI',
  'youtube',
  'livre',
  true,
  true,
  2
);