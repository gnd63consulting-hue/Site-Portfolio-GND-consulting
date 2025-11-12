-- Vérification et correction des données YouTube

-- 1. Vérifier les projets existants
SELECT id, titre, type_projet, video_type, youtube_url, public, featured 
FROM projects 
WHERE video_type = 'youtube' OR youtube_url IS NOT NULL;

-- 2. S'assurer que les projets YouTube sont publics et visibles
UPDATE projects 
SET 
  public = true,
  featured = true,
  created_at = COALESCE(created_at, now()),
  updated_at = now()
WHERE youtube_url IS NOT NULL;

-- 3. Ajouter des projets de test si aucun n'existe
INSERT INTO projects (
  titre, 
  description, 
  type_projet, 
  youtube_url, 
  video_type, 
  public, 
  featured,
  created_at,
  updated_at
) 
SELECT 
  'Vidéo Démo GND Consulting',
  'Démonstration des capacités de production audiovisuelle de GND Consulting',
  'captation_evenement',
  'https://www.youtube.com/watch?v=UbXQim7iNLI',
  'youtube',
  true,
  true,
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM projects WHERE youtube_url = 'https://www.youtube.com/watch?v=UbXQim7iNLI'
);

-- 4. Vérifier le résultat final
SELECT 
  COUNT(*) as total_projects,
  COUNT(CASE WHEN video_type = 'youtube' THEN 1 END) as youtube_projects,
  COUNT(CASE WHEN public = true THEN 1 END) as public_projects
FROM projects;