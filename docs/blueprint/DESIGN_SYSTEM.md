# Jesu Fitness — Design System (`DESIGN_SYSTEM.md`)

## 1. Aesthetic Direction
- **Theme:** Apple Pro Obsidian Dark + Warm Forged Amber
- **Mode:** Persuade (Portfolio / Pitch Demo)
- **Layout Law:** 100% edge-to-edge fluid canvas (`w-full`, `padding-inline: clamp(1.25rem, 3.5vw, 4rem)`). Prose copy capped at `max-width: 58ch`. Zero cramped narrow centered containers on 1920px ultrawide.

## 2. Color Tokens (OKLCH + APCA Verified)
All colors MUST reference `:root` tokens — zero stray literals outside `:root`.

```css
:root {
  --bg-void: oklch(0.145 0.004 80);          /* #0A0A0B warm obsidian base */
  --bg-surface: oklch(0.185 0.006 80);       /* #121213 alternating section surface */
  --bg-elevated: oklch(0.225 0.008 80);      /* #1B1A19 elevated card/form surface */
  --bg-featured-top: oklch(0.245 0.018 78.6);/* subtle amber-tinted elevation for Quarterly */
  --nav-top: oklch(0.145 0.004 80 / 0.92);
  --nav-scrolled: oklch(0.145 0.004 80 / 0.94);
  --nav-fade: oklch(0.145 0.004 80 / 0);
  --scrim-mid: oklch(0.145 0.004 80 / 0.65);
  --scrim-light: oklch(0.145 0.004 80 / 0.18);
  --scrim-side: oklch(0.145 0.004 80 / 0.80);

  --border-hairline: oklch(0.30 0.008 80);
  --border-input: oklch(0.50 0.014 80);      /* >= 3:1 boundary contrast against --bg-void */
  --border-strong: oklch(0.42 0.012 80);

  --ink-primary: oklch(0.962 0.009 84.6);    /* #F5F2EC — APCA Lc -99.3 on void */
  --ink-secondary: oklch(0.762 0.016 80.7);  /* #B7B1A7 — APCA Lc -60.3 on void */
  --accent: oklch(0.773 0.140 78.6);         /* #E5A93B — APCA Lc -61.6 on void */
  --accent-hover: oklch(0.835 0.135 78.6);
  --ink-on-accent: oklch(0.145 0.004 80);    /* APCA Lc 63.2 on accent */
  --error: oklch(0.68 0.19 25);
  --success: oklch(0.74 0.14 148);
}
```

## 3. Typography
- **Display:** `Space Grotesk` (weights 500, 600, 700), tight negative tracking (`-0.03em` to `-0.04em`), `text-wrap: balance`, `overflow-wrap: break-word`.
- **Body & UI:** `Plus Jakarta Sans` (weights 400, 500, 600, 700), `16px+` base, `font-variant-numeric: tabular-nums` on all prices, batch hours, and pass IDs.
- **Prohibited:** Eyebrows/kickers, tracked uppercase labels, italic words inside roman headings, gradient text, pill badges, decorative dots, em-dashes in UI copy.

## 4. Motion System (`motion/react` + CSS Scroll-Driven)
- **Curves:** `--ease-out: cubic-bezier(0.32, 0.72, 0, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`
- **Spring:** `{ type: "spring", stiffness: 320, damping: 30, mass: 0.9 }` (zero sloppy bounce)
- **Scroll Choreography:**
  - `useScroll` + `useTransform` on Hero photography (subtle depth parallax + scale)
  - Scroll-illuminated manifesto lines in Story (`useScroll` progress / `whileInView`)
  - Smooth spring `layoutId` indicator on the `Gym Access` / `+ Personal Training` segmented toggle
  - Spring-transitioned INR price numerals & tactile `scale(0.97)` button press
  - Strict `useReducedMotion()` + `@media (prefers-reduced-motion: reduce)` fallbacks (static visible end-state always guaranteed).

## 5. Verified Real Web Photography Manifest (Zero AI Images)
| Slot | Subject | Verified URL (HTTP 200) |
|---|---|---|
| Hero | Lifter with heavy dumbbells in dark gym | `https://images.unsplash.com/photo-1674834727149-00812f907676?auto=format&fit=crop&w=1800&q=80` |
| Story | Focused dumbbell training in moody lighting | `https://images.unsplash.com/photo-1704223524532-c5b4e8490297?auto=format&fit=crop&w=1400&q=80` |
| Equipment 1 | Matte black dumbbells rack | `https://images.pexels.com/photos/35567437/pexels-photo-35567437.jpeg?auto=compress&cs=tinysrgb&w=1200` |
| Equipment 2 | Barbell & bench press station | `https://images.pexels.com/photos/4853666/pexels-photo-4853666.jpeg?auto=compress&cs=tinysrgb&w=1200` |
| Equipment 3 | Lat pulldown & cable stack | `https://images.pexels.com/photos/17706037/pexels-photo-17706037/free-photo-of-man-exercising-at-gym.jpeg?auto=compress&cs=tinysrgb&w=1200` |
| Equipment 4 | Leg / quad press machine | `https://images.pexels.com/photos/6844939/pexels-photo-6844939.jpeg?auto=compress&cs=tinysrgb&w=1200` |
| Equipment 5 | Treadmills & conditioning | `https://images.pexels.com/photos/12250460/pexels-photo-12250460.jpeg?auto=compress&cs=tinysrgb&w=1200` |
| About Floor | Gym training floor interior | `https://images.pexels.com/photos/4716814/pexels-photo-4716814.jpeg?auto=compress&cs=tinysrgb&w=1600` |
