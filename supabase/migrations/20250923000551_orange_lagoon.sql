/*
  # Correction de la politique RLS pour la table contacts

  1. Problème identifié
    - La table `contacts` a une politique RLS qui empêche l'insertion de nouvelles lignes
    - Erreur: "new row violates row-level security policy for table contacts"
    - Code d'erreur 42501 (insufficient privilege)

  2. Solution
    - Ajouter une politique RLS pour permettre l'insertion publique (anon) dans la table contacts
    - Permettre aux utilisateurs anonymes de créer de nouveaux contacts via le formulaire

  3. Sécurité
    - La politique permet uniquement l'insertion (INSERT)
    - Pas de lecture/modification/suppression pour les utilisateurs anonymes
    - Seuls les admins peuvent consulter les contacts (politique existante)
*/

-- Supprimer l'ancienne politique si elle existe
DROP POLICY IF EXISTS "Allow public contact submissions" ON contacts;

-- Créer une nouvelle politique pour permettre l'insertion publique
CREATE POLICY "Allow public contact submissions"
  ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Vérifier que RLS est activé sur la table contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Optionnel: Ajouter une politique pour que les utilisateurs authentifiés puissent voir leurs propres soumissions
DROP POLICY IF EXISTS "Users can view own contacts" ON contacts;
CREATE POLICY "Users can view own contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);