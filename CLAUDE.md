# CLAUDE.md

## Overview

Personal developer blog and portfolio for Ho Tan Thanh — **thanhht.org**.

- **React SPA** (Vite + HashRouter) with dark developer theme
- **Bilingual** (Vi/En) via i18next
- **Markdown blog** with build-time index generation
- **CV viewer** with embedded HTML + PDF download

Original CV files (`CV_HoTanThanh.html`, `CV_HoTanThanh_EN.html`) are preserved in `public/cv/`.

## Architecture

- **Vite + React** — `npm run dev` to develop, `npm run build` for production
- **HashRouter** — no server config needed for SPA routing
- **i18next** — language toggle, translations in `src/i18n/vi.json` and `en.json`
- **Markdown blog** — posts in `content/blog/{vi,en}/*.md`, indexed by `scripts/generate-blog-index.js`
- **Custom CSS** — no Tailwind; CSS variables in `src/index.css` for dark theme tokens
- **Formspree** — contact form, zero backend

## Key Commands

```bash
npm run dev          # Generate blog index + start dev server
npm run build        # Generate blog index + production build -> dist/
npm run preview      # Preview production build
```

## Design Tokens

```
Background:  #0d1117, #161b22, #21262d
Text:        #e6edf3, #8b949e
Accent:      #58a6ff / #4a9eda
Terminal:    #3fb950 (green), #f85149 (red), #d29922 (yellow)
Font body:   'Segoe UI', system-ui
Font mono:   'JetBrains Mono'
```

## Project Structure

```
src/
  components/layout/    Navbar, Footer, Layout
  components/ui/        TerminalText, TechTag, ProjectCard, SkillBar
  components/sections/  HeroSection
  pages/                Home, About, Projects, Blog, BlogPost, Timeline, Skills, Contact, CV, NotFound
  i18n/                 i18n config + vi.json + en.json
  data/                 projects.js, timeline.js, skills.js, social.js
  hooks/                useTypingEffect
  utils/                blogLoader
content/blog/{vi,en}/   Markdown blog posts
public/cv/              CV HTML + PDF files
public/images/          Avatar image
```

## Key Conventions

- Both Vi/En translations must stay in sync — changes to one should be mirrored in the other
- Blog posts use frontmatter (title, date, excerpt, tags) — run `npm run dev` or `npm run build` to regenerate index
- All data files (`src/data/`) use bilingual objects `{ vi: ..., en: ... }`
- CV HTML files in `public/cv/` reference avatar via `../images/avatar.jpg`
- CV files are self-contained HTML with inline CSS. Print stylesheet enforces A4 single page.
