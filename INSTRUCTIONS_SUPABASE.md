# 🔧 CORRECTION URGENTE - Nom de fichier dans Supabase

## ❌ Problème identifié :
- **Table `projects`** : `video_demo_url = "Mieltestwebsite.mov"` (SANS espaces)
- **Storage** : Fichier = `"Miel test website.mov"` (AVEC espaces)

## ✅ Solution immédiate :

### 1. Ouvrez Supabase Dashboard
- Allez sur : https://gublhtivvydkuooooffg.supabase.co
- Connectez-vous à votre compte

### 2. Modifiez la table `projects`
- Cliquez sur **Table Editor** (dans le menu de gauche)
- Cliquez sur la table **`projects`**
- Trouvez la ligne avec `titre = "Vidéo Test GND"`
- Cliquez sur la cellule `video_demo_url`
- **REMPLACEZ** : `Mieltestwebsite.mov`
- **PAR** : `Miel test website.mov` (avec les espaces !)

### 3. Sauvegardez
- Appuyez sur **Entrée** ou cliquez sur **Save**
- Vérifiez que la valeur est bien : `Miel test website.mov`

### 4. Rechargez votre site
- Retournez sur votre site Bolt
- Rechargez la page (F5)
- Allez dans la section **Portfolio**

## 🎬 Résultat attendu :
Votre vidéo "Miel test website.mov" devrait maintenant s'afficher avec un badge vert "Supabase" dans la section "Vidéo & Design" !

---

## 📋 Valeurs finales correctes dans la table :
```
titre: "Vidéo Test GND"
video_demo_url: "Miel test website.mov"  ← AVEC espaces !
video_type: "supabase_storage"
public: true
featured: true
```

## 🔗 URL finale générée :
```
https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Miel%20test%20website.mov
```