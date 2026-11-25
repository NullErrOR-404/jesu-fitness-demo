# Jesu Fitness — Portfolio Demo

Apple-grade obsidian dark landing page for **Jesu Fitness** (`307, MKN Rd, Ramapuram, Collectors Nagar, Alandur, St.Thomas Mount, Tamil Nadu 600016`).

- **Live Demo:** https://gym1.mhdbuilds-ai.workers.dev
- **Stack:** Vite, React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Lenis Smooth Scroll, Lucide Icons
- **Highlights:**
  - Shared-element intro curtain with logo glide to navbar (`layoutId`)
  - Seamless obsidian tonal melts between sections (zero hard dividers)
  - Two distinct velocity-reactive kinetic marquees with WCAG 2.2.2 Pause/Play controls
  - Non-sticky 1:1 scroll-unfolding 5-card equipment deck
  - Interactive INR Membership Packages with live Personal Training toggle
  - Behind-the-screen dark Google Maps backdrop with scroll-safe map interaction toggle
  - Custom keyboard-accessible spring Dropdowns & searchable Goal Combobox generating an instant Guest Trial Pass + WhatsApp handoff

## Local Development

```bash
npm install
npm run dev
```

## Build & Deploy (Cloudflare `cf` CLI)

```bash
npm run build
cf deploy
```
