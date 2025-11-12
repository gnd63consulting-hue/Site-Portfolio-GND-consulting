/*
  # Corriger l'ajout de vidéos YouTube avec les bonnes valeurs type_projet

  1. Supprime les tentatives précédentes qui ont échoué
  2. Ajoute des projets YouTube avec des valeurs type_projet valides
  3. Utilise les types existants : captation_evenement, clip_promotionnel, video_corporate
*/

-- Nettoyer les tentatives précédentes (au cas où)
DELETE FROM projects WHERE youtube_url IS NOT NULL;

-- Ajouter des projets YouTube de test avec des types valides
INSERT INTO projects (
  titre,
  description,
  type_projet,
  youtube_url,
  video_type,
  featured,
  public,
  created_at
) VALUES 
(
  'Vidéo de Démonstration GND',
  'Exemple de production audiovisuelle intégrée via YouTube pour démonstration des capacités techniques.',
  'captation_evenement',
  'https://www.youtube.com/watch?v=UbXQim7iNLI',
  'youtube',
  true,
  true,
  now()
),
(
  'Clip Promotionnel YouTube',
  'Démonstration de l''intégration YouTube dans le portfolio GND Consulting.',
  'clip_promotionnel',
  'https://www.youtube.com/watch?v=UbXQim7iNLI',
  'youtube',
  true,
  true,
  now()
),
(
  'Vidéo Corporate Demo',
  'Test d''intégration vidéo YouTube dans la section portfolio.',
  'video_corporate',
  'https://www.youtube.com/watch?v=UbXQim7iNLI',
  'youtube',
  false,
  true,
  now()
);