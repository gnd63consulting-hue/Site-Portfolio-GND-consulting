# 🚀 SOLUTION : Créer l'entrée dans la table `projects`

## ❌ **Problème identifié :**
- La table `projects` est **VIDE** (0 projets trouvés)
- Il faut **CRÉER** une nouvelle ligne avec votre vidéo

## ✅ **Solution étape par étape :**

### 1. **Ouvrez Supabase Dashboard**
- Allez sur : https://gublhtivvydkuooooffg.supabase.co
- Connectez-vous

### 2. **Allez dans Table Editor**
- Cliquez sur **"Table Editor"** dans le menu de gauche
- Cliquez sur la table **"projects"**

### 3. **Ajoutez une nouvelle ligne**
- Cliquez sur **"Insert"** ou **"+ Insert row"**
- Remplissez les champs suivants :

```
titre: "Vidéo Test GND"
description: "Vidéo de démonstration hébergée sur Supabase"
type_projet: "production_audiovisuelle"
video_demo_url: "Miel test website.mov"
video_type: "supabase_storage"
video_source: "supabase_storage"
public: true
featured: true
cover_url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
```

### 4. **Sauvegardez**
- Cliquez sur **"Save"** ou **"Insert"**

### 5. **Vérifiez**
- Vous devriez voir votre nouvelle ligne dans la table
- Rechargez votre site Bolt

## 🎬 **Résultat attendu :**
Votre vidéo va enfin s'afficher dans la section Portfolio !

---

## 📋 **Valeurs exactes à copier-coller :**

| Colonne | Valeur |
|---------|--------|
| `titre` | `Vidéo Test GND` |
| `description` | `Vidéo de démonstration hébergée sur Supabase` |
| `type_projet` | `production_audiovisuelle` |
| `video_demo_url` | `Miel test website.mov` |
| `video_type` | `supabase_storage` |
| `video_source` | `supabase_storage` |
| `public` | `true` |
| `featured` | `true` |
| `cover_url` | `https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600` |

## ⚠️ **ATTENTION :**
- Respectez **exactement** l'orthographe : `"Miel test website.mov"` (avec espaces)
- `public` et `featured` doivent être à `true`
- `video_type` doit être `"supabase_storage"`