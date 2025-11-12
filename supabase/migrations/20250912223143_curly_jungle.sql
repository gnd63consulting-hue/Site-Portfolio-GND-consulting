/*
  # Ajouter le support Cloudinary aux projets

  1. Nouvelles colonnes
    - `cloudinary_public_id` (text) - ID public Cloudinary pour les vidéos
    - `video_source` (text) - Source de la vidéo: 'youtube', 'cloudinary', 'local'
  
  2. Mise à jour
    - Modifier la contrainte video_type pour inclure 'cloudinary'
    - Ajouter des index pour les performances
*/

-- Ajouter les nouvelles colonnes
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS cloudinary_public_id text,
ADD COLUMN IF NOT EXISTS video_source text DEFAULT 'local';

-- Mettre à jour la contrainte video_type pour inclure cloudinary
ALTER TABLE projects 
DROP CONSTRAINT IF EXISTS projects_video_type_check;

ALTER TABLE projects 
ADD CONSTRAINT projects_video_type_check 
CHECK (video_type IN ('local', 'youtube', 'vimeo', 'cloudinary'));

-- Ajouter des index pour les performances
CREATE INDEX IF NOT EXISTS idx_projects_cloudinary 
ON projects(cloudinary_public_id) 
WHERE cloudinary_public_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_projects_video_source 
ON projects(video_source);

-- Insérer quelques projets de démonstration Cloudinary
INSERT INTO projects (
  titre, 
  description, 
  type_projet, 
  cloudinary_public_id,
  video_type,
  video_source,
  featured, 
  public,
  created_at
) VALUES 
(
  'Production Audiovisuelle GND',
  'Démonstration de nos capacités en production vidéo 8K avec équipement professionnel et post-production avancée.',
  'captation_evenement',
  'gnd_demo_video_1',
  'cloudinary',
  'cloudinary',
  true,
  true,
  now()
),
(
  'Vidéo Corporate Premium',
  'Création de contenu corporate haut de gamme pour valoriser votre image de marque et communiquer efficacement.',
  'video_corporate',
  'gnd_corporate_video',
  'cloudinary',
  'cloudinary',
  true,
  true,
  now()
),
(
  'Motion Design Créatif',
  'Animations et effets visuels sur-mesure pour captiver votre audience et transmettre vos messages avec impact.',
  'motion_design',
  'gnd_motion_design',
  'cloudinary',
  'cloudinary',
  false,
  true,
  now()
)
ON CONFLICT DO NOTHING;

-- Vérification des données insérées
SELECT 
  titre,
  type_projet,
  cloudinary_public_id,
  video_source,
  featured,
  public
FROM projects 
WHERE video_source = 'cloudinary'
ORDER BY featured DESC, created_at DESC;