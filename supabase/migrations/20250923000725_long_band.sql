/*
  # Corriger la politique RLS pour la table contacts

  1. Problème
    - La table contacts bloque les insertions avec l'erreur "new row violates row-level security policy"
    - Les utilisateurs anonymes ne peuvent pas soumettre le formulaire de contact

  2. Solution
    - Supprimer toutes les politiques existantes qui pourraient causer des conflits
    - Créer une nouvelle politique permettant l'insertion pour les utilisateurs anonymes et authentifiés
    - Maintenir la sécurité en lecture pour les admins uniquement

  3. Sécurité
    - INSERT: autorisé pour anon et authenticated (formulaire de contact)
    - SELECT: autorisé uniquement pour les admins et propriétaires
    - UPDATE/DELETE: autorisé uniquement pour les admins
*/

-- Supprimer toutes les politiques existantes sur la table contacts
DROP POLICY IF EXISTS "Allow public contact submissions" ON contacts;
DROP POLICY IF EXISTS "Users can view own contacts" ON contacts;
DROP POLICY IF EXISTS "Admins can view all contacts" ON contacts;

-- Créer une politique pour permettre l'insertion de nouveaux contacts
CREATE POLICY "Enable insert for contact form submissions"
  ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Créer une politique pour que les utilisateurs puissent voir leurs propres contacts
CREATE POLICY "Users can view own contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Créer une politique pour que les admins puissent tout voir
CREATE POLICY "Admins can manage all contacts"
  ON contacts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.email = 'gnd63consulting@gmail.com'
    )
  );

-- S'assurer que RLS est activé
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;