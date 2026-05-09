# Project: NewJobs (thanhht.org)

Personal developer portfolio and blog for Ho Tan Thanh, built with a modern React stack and a dark "developer" aesthetic.

## 🛠 Technology Stack

- **Framework:** React 19 + Vite 8
- **Routing:** React Router 7 (HashRouter for SPA compatibility)
- **Styling:** Vanilla CSS with modern tokens (CSS Variables) in `src/index.css`
- **i18n:** i18next with VI/EN support
- **Blog:** Markdown-based with build-time index generation
- **Deployment:** Cloudflare Pages (via Wrangler)
- **Icons:** Lucide React

## 🚀 Key Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Regenerates blog index and starts the Vite development server. |
| `npm run build` | Regenerates blog index and creates a production build in `dist/`. |
| `npm run lint` | Runs ESLint for code quality checks. |
| `npm run deploy` | Builds and deploys the project to Cloudflare Pages. |
| `npm run generate-blog` | Manually regenerates `public/blog-index.json` from Markdown files. |

## 📂 Project Structure

- `content/blog/`: Markdown source files for blog posts, organized by language (`vi/`, `en/`).
- `public/cv/`: Preserved static HTML CV files and PDF versions.
- `scripts/`: Node.js build scripts (e.g., blog index generation).
- `src/components/`:
  - `layout/`: Navbar, Footer, and main Layout wrapper.
  - `ui/`: Reusable UI elements like `TerminalText`, `GlowCard`, `MagneticButton`.
  - `sections/`: Complex sections like `HeroSection`.
  - `game/`: Components for interactive games (XO, etc.).
- `src/pages/`: Route-level page components.
- `src/data/`: Static data files (projects, skills, timeline) used across the site.
- `src/i18n/`: i18next configuration and translation JSON files (`vi.json`, `en.json`).

## ✍️ Development Conventions

### Internationalization (i18n)
- The project is bilingual (Vietnamese/English).
- **Mandatory:** Always keep `src/i18n/vi.json` and `src/i18n/en.json` in sync.
- Component-specific data in `src/data/` often uses objects with `vi` and `en` keys.

### Blog Management
- Blog posts are stored in `content/blog/{lang}/{slug}.md`.
- Posts require frontmatter (YAML-like metadata):
  ```markdown
  ---
  title: "Post Title"
  date: "2024-03-20"
  excerpt: "Short summary"
  tags: ["react", "vite"]
  category: "work"
  ---
  ```
- **Crucial:** Run `npm run generate-blog` (or `npm run dev`/`build`) whenever you add or modify posts to update the global index.

### Styling
- No utility frameworks like Tailwind are used.
- Custom CSS is scoped to components via separate `.css` files.
- Global theme tokens (colors, spacing) are defined in `src/index.css`.

### Deployment
- Deployments are handled via Cloudflare Pages.
- Ensure `dist/` is fresh before deploying by using `npm run build`.
