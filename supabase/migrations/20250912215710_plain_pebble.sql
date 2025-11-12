/*
  # Ajouter une vidéo YouTube spécifique pour test

  1. Supprime les anciens tests
  2. Ajoute la vidéo YouTube demandée
  3. Configure comme featured et public
  4. Vérifie l'insertion
*/

-- Nettoyer les anciens tests
DELETE FROM projects WHERE youtube_url IS NOT NULL;

-- Ajouter la vidéo YouTube spécifique
INSERT INTO projects (
  titre,
  description,
  type_projet,
  youtube_url,
  video_type,
  featured,
  public,
  ordre_affichage,
  created_at
) VALUES (
  'Vidéo de Démonstration GND',
  'Vidéo de test pour valider l''intégration YouTube dans le portfolio. Cette vidéo permet de tester la lecture intégrée et l''affichage des thumbnails.',
  'captation_evenement',
  'https://www.youtube.com/watch?v=UbXQim7iNLI',
  'youtube',
  true,
  true,
  1,
  now()
);

-- Vérifier l'insertion
SELECT 
  id,
  titre,
  type_projet,
  youtube_url,
  video_type,
  featured,
  public
FROM projects 
WHERE youtube_url IS NOT NULL;

-- Statistiques finales
SELECT 
  COUNT(*) as total_projects,
  COUNT(CASE WHEN youtube_url IS NOT NULL THEN 1 END) as youtube_projects,
  COUNT(CASE WHEN video_type = 'youtube' THEN 1 END) as youtube_type_projects
FROM projects;