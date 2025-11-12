/*
  # Ajout simple de la vidéo YouTube

  1. Insertion directe
    - Utilise les valeurs connues valides
    - Pas de requête sur pg_constraint
    - Compatible avec toutes versions PostgreSQL

  2. Nettoyage préalable
    - Supprime les tests précédents
    - Table propre pour le test

  3. Données complètes
    - URL YouTube exacte
    - Type de projet valide
    - Métadonnées complètes
*/

-- Nettoyage des tests précédents
DELETE FROM projects WHERE titre LIKE '%Démonstration%' OR titre LIKE '%Test%' OR titre LIKE '%Demo%';

-- Insertion simple avec valeurs connues valides
INSERT INTO projects (
  titre,
  description,
  type_projet,
  youtube_url,
  video_type,
  featured,
  public,
  created_at
) VALUES (
  'Vidéo de Démonstration GND',
  'Vidéo de test pour l''intégration YouTube dans le portfolio GND Consulting',
  'captation_evenement',
  'https://www.youtube.com/watch?v=UbXQim7iNLI',
  'youtube',
  true,
  true,
  now()
);

-- Vérification simple
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