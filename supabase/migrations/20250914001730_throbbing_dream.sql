/*
  # Corriger les permissions RLS pour la table projects

  1. Désactiver temporairement RLS
  2. Créer une politique publique pour la lecture
  3. Réactiver RLS avec les bonnes permissions
*/

-- Désactiver RLS temporairement
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture publique
DROP POLICY IF EXISTS "Allow public read access" ON projects;
CREATE POLICY "Allow public read access" 
  ON projects 
  FOR SELECT 
  TO anon, authenticated 
  USING (public = true);

-- Réactiver RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;