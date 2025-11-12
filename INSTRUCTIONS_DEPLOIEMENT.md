# 🚀 Instructions de Déploiement - gndconsulting.fr

## ✅ Préparation terminée

Votre site est prêt à être déployé ! Tous les fichiers sont compilés dans le dossier `dist/`.

---

## 📋 Méthode 1 : Déploiement via FileZilla (Recommandé)

### Étape 1 : Télécharger FileZilla
- 🔗 **Lien** : https://filezilla-project.org/download.php?type=client
- Choisissez la version pour votre système (Windows/Mac/Linux)
- Installez le logiciel

### Étape 2 : Se connecter au serveur FTP

**Informations de connexion :**
```
Hôte     : ftp.gndconsulting.fr
Port     : 21
Utilisateur : u708748279
Mot de passe : Pikliz509$
```

**Dans FileZilla :**
1. Ouvrez FileZilla
2. En haut, remplissez les champs :
   - **Hôte** : `ftp.gndconsulting.fr`
   - **Identifiant** : `u708748279`
   - **Mot de passe** : `Pikliz509$`
   - **Port** : `21`
3. Cliquez sur **Connexion rapide**

### Étape 3 : Naviguer vers le bon dossier

**Sur le serveur (panneau de droite) :**
- Double-cliquez sur le dossier `public_html`
- C'est ici que votre site doit être placé

### Étape 4 : Supprimer l'ancien contenu (si existant)

**Dans `public_html` :**
1. Sélectionnez TOUS les fichiers existants
2. Clic droit → **Supprimer**
3. Confirmez la suppression

### Étape 5 : Télécharger les nouveaux fichiers

**Sur votre ordinateur (panneau de gauche) :**
1. Naviguez vers le dossier de votre projet
2. Entrez dans le dossier `dist/`
3. **IMPORTANT** : Sélectionnez TOUT le CONTENU du dossier `dist/` :
   - Le fichier `index.html`
   - Le fichier `.htaccess`
   - Le fichier `robots.txt`
   - Le fichier `sitemap.xml`
   - Le dossier `assets/` complet
   - Tous les fichiers images (.png, .jpg, .svg)
   - Les fichiers `_headers` et `_redirects` (s'ils existent)

4. Faites un **glisser-déposer** vers `public_html` (panneau de droite)
5. Attendez que tous les fichiers soient transférés (40 fichiers au total)

### Étape 6 : Vérification

Une fois le transfert terminé :
- Ouvrez votre navigateur
- Allez sur **https://gndconsulting.fr**
- Votre site devrait s'afficher immédiatement !

---

## 📋 Méthode 2 : Via le Gestionnaire de fichiers Hostinger

### Étape 1 : Se connecter à Hostinger
1. Allez sur https://www.hostinger.fr
2. Connectez-vous à votre compte
3. Allez dans **Hébergement** → **Gestionnaire de fichiers**

### Étape 2 : Nettoyer public_html
1. Ouvrez le dossier `public_html`
2. Sélectionnez tous les fichiers existants
3. Cliquez sur **Supprimer**

### Étape 3 : Télécharger les fichiers
1. Cliquez sur **Télécharger** (Upload)
2. Sélectionnez TOUS les fichiers du dossier `dist/` de votre projet
3. Attendez la fin du téléchargement

---

## 🔧 Fichiers importants créés

### `.htaccess` (déjà inclus dans dist/)
Ce fichier gère :
- ✅ Redirection automatique vers HTTPS
- ✅ Redirection www → non-www
- ✅ Routing pour React (Single Page Application)
- ✅ Compression Gzip
- ✅ Cache navigateur optimisé
- ✅ En-têtes de sécurité

---

## ⚠️ Points importants

### Variables d'environnement Supabase
Vos clés Supabase sont déjà intégrées dans les fichiers JavaScript compilés :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Pas besoin de configuration supplémentaire sur le serveur !

### Structure finale sur le serveur
```
public_html/
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── index-*.css
│   ├── index-*.js
│   └── ... (tous les fichiers compilés)
└── ... (toutes vos images)
```

---

## 🐛 Dépannage

### Le site ne s'affiche pas
1. Vérifiez que tous les fichiers sont bien dans `public_html` (pas dans un sous-dossier)
2. Vérifiez que le fichier `.htaccess` est présent
3. Videz le cache de votre navigateur (Ctrl+Shift+R)

### Erreur 404 sur les pages
- Le fichier `.htaccess` n'est peut-être pas présent
- Téléchargez-le à nouveau depuis le dossier `dist/`

### Les images ne s'affichent pas
- Vérifiez que toutes les images sont bien transférées
- Les images doivent être à la racine de `public_html`, pas dans un sous-dossier

---

## ✅ Checklist finale

- [ ] FileZilla installé et connecté
- [ ] Ancien contenu de `public_html` supprimé
- [ ] Tous les fichiers du dossier `dist/` transférés
- [ ] Le fichier `.htaccess` est présent
- [ ] Le site s'affiche sur https://gndconsulting.fr
- [ ] Les flèches de navigation du portfolio sont visibles
- [ ] Les vidéos/photos se chargent correctement

---

## 📞 Support

Si vous rencontrez des difficultés :
1. Vérifiez que TOUS les fichiers sont bien transférés (40 fichiers au total)
2. Assurez-vous d'être dans `public_html` et non dans un sous-dossier
3. Videz votre cache navigateur

**Votre site est prêt à être mis en ligne ! 🎉**
