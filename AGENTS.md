# AGENTS.md — Zhuoli Yang (杨卓力) Personal Website

This document provides context, design principles, persona details, and development guidelines for AI agents and developers maintaining or extending this repository.

---

## 1. Project Overview & Objective

This repository contains the personal academic portfolio website for **Zhuoli Yang (杨卓力)**, a high school student based in Kunming, China (Class of 2027), preparing for international undergraduate admissions in Life Sciences / Molecular Biology (target programs include HKU 6688 Science Master Class / YSS, top universities in Singapore, Hong Kong, etc.).

The website serves as an authentic, scholarly, and visually compelling digital profile showcasing his genuine scientific curiosity, hands-on biology projects (specimen articulation, vivarium husbandry, biomechanics), academic rigor, and multidisciplinary pursuits (Saxophone Grade 10, Model UN).

---

## 2. Core Persona & Narrative

- **Name**: Zhuoli Yang / 杨卓力
- **Education**: Kunming Xishan Long-Spring Experiment Middle School (Physics, Chemistry, Biology Track; High School Diploma 2024–2027).
- **Academic Highlights**:
  - Senior standardized midterm score: **625.5 / 750** (Ranked 11th in senior cohort).
  - Subject scores: Chemistry **97/100**, Biology **95/100**, Mathematics **122/150**, Physics **89/100**.
  - English proficiency: **TOEFL iBT 93**.
- **Core Scientific Passions**:
  1. **Comparative Anatomy & Specimen Articulation**: Articulated a complex *Hydrocynus goliath* (goliath tigerfish) skeleton from scratch, conducting preliminary concentration trials on crucian carp (*Carassius carassius*) with $\text{NaOH}$ to safely remove lipids without damaging bone density.
  2. **Vivarium Husbandry & Diagnostic Pathology**: Years of raising aquatic species, reptiles, spiders, and scorpions; understanding water parameters, quarantine protocols, and differential diagnosis between parasitic infections (e.g. Ich / white spot disease) and bacterial ailments.
  3. **Biomechanics & Molecular Biology**: Questions regarding structure-function relationships (e.g., elastic energy storage in grasshopper hind legs) and how molecular changes dictate macroscopic biological functions.
- **Extracurricular & Arts**:
  - **Saxophone**: Grade 10 Certificate (China National Opera & Dance Drama Theater).
  - **Model UN**: WIMUN New York 2024 at UN Headquarters (Delegate of Switzerland, Second Committee).
  - **Global Immersion**: University of Sydney immersion (lectures & certificate), UNSW Arc, Harvard Student Agencies (HSA).
- **Tone & Voice**:
  - Humble, inquisitive, authentic, and method-driven.
  - Avoid boastful or exaggerated claims; highlight *process*, *scientific methodology*, *resilience*, and *systematic thinking*.
  - Key quote: *"Patience alone is not enough; one also needs a method."*

---

## 3. Technology Stack & Deployment

- **Stack**: Pure Modern Static Web (HTML5, Tailwind CSS via CDN, Vanilla JavaScript, Lucide Icons).
- **Zero-Build Architecture**: No Node.js or heavy compilation steps required locally. Files can be opened directly or previewed with `python -m http.server 3000`.
- **Hosting & CI/CD**:
  - Hosted on **Vercel** via GitHub integration (`git@github.com:yangdrew028/zhuoliyang-web.git`).
  - Configured with `vercel.json` for clean routing and security headers.
  - Every push to `main` triggers an automatic, zero-config production deployment on Vercel.

---

## 4. Design Language & UI Guidelines

- **Theme Palette**:
  - **Primary / Nature Green**: `#059669` (Emerald 600) / `#10b981` (Emerald 500) representing life sciences and botany.
  - **Deep Slate / Navy**: `#0f172a` (Slate 900) / `#1e293b` (Slate 800) for structural elegance and academic depth.
  - **Card / Background**: Light theme (`#f8fafc` / `#ffffff`) and Dark theme (`#090d16` / `#131b2e`).
  - **Accent**: Cyan / Teal `#06b6d4` for biotechnology touches.
- **Typography**:
  - Sans-serif: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`.
  - Monospace / Scientific labels: `JetBrains Mono`, `ui-monospace`, `monospace`.
- **Image Policy**:
  - **No raw or broken images**. Until actual photos are uploaded by Zhuoli, use styled SVG cards or CSS placeholders with descriptive tags (e.g. `[Specimen Articulation Photo Placeholder]`).
  - To add real photos, place image files into `assets/images/` and replace the placeholder `div` with `<img>` tags.

---

## 5. File Structure

```text
zhuoliyang-web/
├── AGENTS.md             # This agent instruction document
├── README.md             # Developer & user guide
├── vercel.json           # Vercel deployment configuration
├── index.html            # Main portfolio page
├── styles.css            # Custom CSS & theme styles
├── script.js             # Interactive behaviors & dark mode
└── assets/
    └── images/           # Image directory (.gitkeep included)
```

---

## 6. Guidelines for AI Modifications

When modifying or expanding this codebase:
1. **Preserve Zero-Dependency Simplicity**: Do not introduce complex build frameworks (e.g. Webpack, Next.js, Vite) unless explicitly requested by the user.
2. **Preserve Academic Rigor**: Ensure biological terms (*Hydrocynus goliath*, *Carassius carassius*, NaOH lipid saponification, elastic energy, osteology) are accurate and spelt properly with scientific binomial nomenclature italicized.
3. **Responsive & Accessible**: Ensure all UI elements support mobile screens, desktop monitors, and dark/light mode toggle.
4. **Git Discipline**: Test changes locally before committing with concise, descriptive commit messages.
