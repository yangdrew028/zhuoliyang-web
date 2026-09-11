# Zhuoli Yang (杨卓力) — Personal Academic Website

A modern, responsive personal portfolio website for **Zhuoli Yang (杨卓力)**, high school student (Class of 2027) passionate about life sciences, comparative osteology, vivarium ecology, and molecular biotechnology.

Live Deployment: Ready for [Vercel](https://vercel.com/) via [`yangdrew028/zhuoliyang-web`](https://github.com/yangdrew028/zhuoliyang-web).

---

## 🌟 Key Features

- **Zero-Build Static Architecture**: Pure modern HTML5 + Tailwind CSS (via CDN) + Vanilla JS + Lucide vector icons.
- **Vercel Optimized**: Configured with [`vercel.json`](./vercel.json) for instant, zero-configuration deployment.
- **Academic Narrative**: Highlights hands-on biology projects (*Hydrocynus goliath* skeleton articulation, vivarium diagnostic husbandry, biomechanical inquiry), standardized academic excellence (Midterm Rank #11 in grade cohort, Chemistry 97, Biology 95, TOEFL 93), and multidisciplinary talents (Saxophone Grade 10, WIMUN NY @ UN Headquarters).
- **Interactive Capabilities**:
  - Light / Dark Mode toggle with preference persistence in `localStorage`.
  - Category filtering for research projects.
  - Interactive modal dialogs with deep-dive experimental methodologies.
  - One-click email copy button with toast feedback.
  - Fully responsive layout across mobile, tablet, and desktop screens.
- **Image Policy**: Uses styled, elegant SVG and CSS placeholder cards with zero broken links. Ready for photos to be uploaded at any time.

---

## 🚀 Local Preview

You can preview the website locally using either method:

### Method 1: Direct Browser Opening
Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Safari, or Firefox.

### Method 2: Python Local Server (Recommended)
Open PowerShell or your terminal in this directory and run:
```bash
python -m http.server 3000
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

1. Push your latest commits to GitHub:
   ```bash
   git add .
   git commit -m "feat: initial website scaffold and AGENTS.md"
   git push origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/):
   - Click **Add New...** -> **Project**.
   - Select the `zhuoliyang-web` repository.
   - Framework Preset: **Other** (leave build command empty).
   - Click **Deploy**.
3. Any future `git push` to `main` will automatically trigger a new deployment.

---

## 📸 Replacing Placeholder Cards with Photos

When real photos are ready:
1. Place image files into the [`assets/images/`](./assets/images/) folder (e.g., `avatar.jpg`, `tigerfish.jpg`, `saxophone.jpg`).
2. In `index.html`, replace the corresponding `<div class="specimen-placeholder ...">...</div>` container with an image tag:
   ```html
   <img src="assets/images/tigerfish.jpg" alt="Hydrocynus goliath Articulation" class="w-full h-48 object-cover rounded-xl shadow-sm">
   ```

---

## 🤖 AI Guidelines

See [`AGENTS.md`](./AGENTS.md) for full context, persona, narrative rules, and technical instructions for AI assistants.
