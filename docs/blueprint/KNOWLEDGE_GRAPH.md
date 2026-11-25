# Jesu Fitness — Living Knowledge Graph (`KNOWLEDGE_GRAPH.md`)

## 1. Tech Stack
- **Runtime & Bundler:** Vite + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss";` + `@tailwindcss/vite`) + custom `:root` OKLCH design tokens in `src/index.css`
- **Motion & Scroll:** `motion` (`motion/react`) for scroll-linked parallax, velocity-reactive marquees, `layoutId` morphing toggle, spring popovers & numeral transitions + `lenis` inertial smooth scroll (reduced-motion gated) + native CSS scroll-progress hairline
- **Icons:** `lucide-react` (consistent stroke weight, `aria-hidden="true"` on decorative icons)

## 2. Planned Repository Topology
```text
c:\Jesu Fitness\
├── docs/blueprint/
│   ├── PRD-LITE.md
│   ├── DESIGN_SYSTEM.md
│   └── KNOWLEDGE_GRAPH.md
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx
    ├── index.css              # Tailwind v4 + :root OKLCH tokens + scroll/form utilities
    ├── data/gymData.ts        # Equipment catalog, INR packages, gym facts, verified photo URLs
    ├── App.tsx                # Root page orchestrator + shared selectedPlan / isPT state
    ├── hooks/
    │   └── useLenisScroll.ts  # Lenis smooth scroll + anchor interception
    └── components/
        ├── IntroCurtain.tsx   # Full-screen obsidian intro overlay with shared-element logo glide to Navbar
        ├── Navbar.tsx         # Fixed nav + scroll progress hairline + shared-element brand lockup
        ├── Hero.tsx           # Full-bleed parallax hero + batch/rate summary
        ├── KineticMarquee.tsx # Two distinct sleek bands: Forged Amber ribbon + tilted dual-track marquee
        ├── StorySection.tsx   # Scroll-illuminated manifesto + lifter photography
        ├── EquipmentRail.tsx  # Non-sticky 1:1 scroll-driven uneven card stack unfolding into fluid 5-column grid
        ├── AboutSection.tsx   # Split architectural floor view + hairline facts ledger
        ├── PackagesSection.tsx# 3 INR tiers + layoutId PT toggle + spring prices
        ├── LocationSection.tsx# Full-bleed dark Google Maps backdrop (307 MKN Rd, Alandur) + lock toggle
        ├── PremiumSelect.tsx  # Custom keyboard-navigable spring Dropdown & searchable Combobox
        ├── EnquirySection.tsx # Deferred :user-invalid form + PremiumDropdown/Combobox + Guest Pass
        └── Footer.tsx         # Clean architectural footer + Alandur address & photo credits
```

## 3. Core State & Data Flow
- `App.tsx` owns `selectedPlan` (`Monthly` | `Quarterly` | `Annual`) and `withPT` (`boolean`).
- `PackagesSection` toggles `withPT` (live INR recalculation) and invokes `onSelectPlan(plan, withPT)` which updates state, smooth-scrolls to `#enquiry`, and focuses the Name field.
- `EnquirySection` syncs its `packageSelect` dropdown to `selectedPlan` + `withPT`, validates on blur/submit (`:user-invalid`), and transitions into the interactive **Jesu Fitness Guest Pass** with a generated `JF-XXXX` code and pre-filled `https://wa.me/...` handoff link.

## 4. Verification Contract
- TypeScript check (`npx tsc --noEmit`) + production Vite build (`npm run build`).
- Live Brave verification via Playwright/Chrome DevTools at `375px`, `1440px`, and `1920px`:
  - `0` failed CSS/font/image requests (`status >= 400`)
  - Real `text/css` MIME + computed Space Grotesk / Plus Jakarta Sans fonts applied
  - Interactive check of PT toggle, package prefill scroll, and Trial Pass generation.
