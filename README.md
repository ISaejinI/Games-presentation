# Projet – Site animé (Vite + GSAP)

Site web expérimental fortement axé sur les animations et les interactions, développé avec **Vite**.  
Le projet met l’accent sur les transitions de pages, les animations au scroll et l’expérience utilisateur fluide.

---

## 🎨 Inspirations visuelles

La direction artistique et le traitement visuel du site s’inspirent principalement des univers suivants :

- **Thunder Lotus Games**  
  https://thunderlotusgames.com/  
  → Pour l’ambiance, la narration visuelle et la mise en valeur des contenus

- **Ciao Kombucha**  
  https://www.ciaokombucha.com/  
  → Pour les choix graphiques, les couleurs, les animations subtiles et l’identité forte

Ces références servent de base esthétique, adaptées au contexte et aux contraintes du projet.

---

## 🧰 Stack & technologies utilisées

- **Vite** – Bundler et environnement de développement
- **JavaScript (ES6+)**
- **GSAP (GreenSock)** – Animations avancées
- **Lenis** – Smooth scroll
- **Cuberto Mouse Follower** – Custom cursor
- **HTML / CSS**

---

## ✨ Fonctionnalités & attendus du projet

### Animations & interactions

- [x] **Preloader**
- [x] **Transition de page**  
  Inspirée du site Awwwards :  
  https://iventions.com/
- [x] **Text reveal**
- [x] **Animations au scroll**   
  Inspirées du site :  (refaite à l'aide du tuto de CodeGrid) 
  https://www.nakedcityfilms.com/
- [x] **Section pin**
- [x] **Scroll horizontal**
- [x] **Carousel**  
  Inspiré du site :  (refaite à l'aide du tuto de CodeGrid)  
  https://www.lacrapulestudio.com/
- [x] **Smooth scroll** avec **Lenis**
- [x] **Custom cursor** avec **Cuberto**

---

## 🛠️ Détails à corriger / améliorations à venir

- Bloquer le **scroll pendant l’animation de changement de page**
- Modifier le **custom cursor au hover des liens**
  - Voir avec *Cursor* pour lui fournir le fichier et l’adapter au style du site
- Faire **disparaître la navbar** (animation ou suppression selon contexte)

---

## 🚀 Lancer le projet en local

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible par défaut à l’adresse :
👉 http://localhost:5173

---

## 📦 Build pour la production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier dist/.
