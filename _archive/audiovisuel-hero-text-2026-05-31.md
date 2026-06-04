# Audiovisuel — Hero text backup (avant refonte)

**Date** : 31 mai 2026
**Page** : `/services/audiovisuel`
**Source** : `src/refonte/pages/service-pages.tsx` (function `AudiovisuelPage` ~ ligne 1011)
**Statut** : texte à retravailler. Cette archive conserve les chaînes actuelles
au cas où le nouveau hero remplacerait tout sans qu'on ait validé le copy.

---

## Strings — copie verbatim

### Breadcrumb / eyebrow
```
audiovisuel
```

### Kicker
```
Audiovisuel
```

### Title (h1, avec JSX)
```jsx
<>Vidéo, motion,<br/><span className="italic">photographie</span>.</>
```

Version texte brut :
```
Vidéo, motion,
photographie.
```
(le mot « photographie » est en italique dans la composition)

### Subtitle
```
Studio créatif parisien — captation 4K/8K, motion design 2D/3D,
photographie pro. Trois disciplines, un seul interlocuteur,
une seule direction artistique.
```

### Badges (chips affichées sous le subtitle)
```
4K / 8K cinéma
Motion 2D · 3D
Photo studio & extérieur
Paris · FR
```

### CTA primaire
```
Démarrer un projet audiovisuel
```
→ href `#/contact`

### CTA secondaire (auto-injecté par ServiceLayout)
```
Voir nos réalisations
```
→ href `#/realisations`

### Footer label hero (mention bas)
```
Audiovisuel
```
(reprend la valeur du kicker)

---

## Hero media (visuel droite)

Image utilisée :
- Fichier : `/assets/svc-production.png`
- Alt : `Audiovisuel — GND Consulting`
- Container : `relative max-w-[460px] mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-black/40 bg-surface`
- Aspect-ratio : `4/5`

---

## Notes pour la refonte

- Le mot mis en italique dans le h1 actuel est « photographie ». Penser à
  conserver l'option de mise en exergue (un mot italique) si la grammaire
  visuelle d'autres hero est similaire (cf. Branding « identitée », Sites
  Vitrines « vitrines », etc.).
- Les 4 badges correspondent aux 4 sous-disciplines historiques :
  - Vidéo / 4K-8K (captation cinéma)
  - Motion 2D · 3D (animation)
  - Photo (studio + extérieur)
  - Localisation Paris/FR (signal réassurance)
- Le CTA primaire reste personnalisé par discipline ("Démarrer un projet
  audiovisuel" vs générique). Ne pas perdre cette spécificité si le nouveau
  hero accepte ce paramétrage.
