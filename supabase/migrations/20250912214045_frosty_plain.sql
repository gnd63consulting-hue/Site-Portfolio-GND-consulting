/*
  # Ajouter le support YouTube aux projets

  1. Modifications
    - Ajouter colonne `youtube_url` à la table `projects`
    - Ajouter colonne `video_type` pour différencier les types de vidéos
    - Mettre à jour les contraintes et index

  2. Sécurité
    - Pas de changement RLS nécessaire
*/

-- Ajouter les nouvelles colonnes
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS youtube_url text,
ADD COLUMN IF NOT EXISTS video_type character varying(20) DEFAULT 'local';

-- Ajouter une contrainte pour le type de vidéo
ALTER TABLE projects 
ADD CONSTRAINT projects_video_type_check 
CHECK (video_type IN ('local', 'youtube', 'vimeo'));

-- Ajouter un index pour les vidéos YouTube
CREATE INDEX IF NOT EXISTS idx_projects_youtube 
ON projects (youtube_url) 
WHERE youtube_url IS NOT NULL;

-- Ajouter un commentaire pour documenter
COMMENT ON COLUMN projects.youtube_url IS 'URL complète de la vidéo YouTube (ex: https://www.youtube.com/watch?v=VIDEO_ID)';
COMMENT ON COLUMN projects.video_type IS 'Type de vidéo: local, youtube, ou vimeo';