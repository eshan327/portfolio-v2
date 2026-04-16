# Eshan Khan — Portfolio Website: Full Technical & Design Specification

## How to Use This Document

This document is the single source of truth for building Eshan Khan's portfolio website. It covers every technical, architectural, and design decision. An AI agent or developer should be able to build the complete site from this document alone without making any uninstructed judgment calls. If a decision is not specified here, the default is: prefer simplicity, prefer consistency with surrounding patterns, and prefer fewer abstractions over more.

---

## 1. Project Identity

**Owner:** Eshan Khan
**Purpose:** Personal portfolio site for a CS + Mathematics student at UMD (GPA 3.8, graduating May 2027) who is an incoming Quantitative Trader Intern at IMC Trading and a Quant Developer at Apex Fund. The site must appeal equally to quant finance and software engineering recruiters.
**Tone:** Authoritative, precise, refined. Not playful. Not corporate. Mathematical without being cold. The site should feel like it was designed by someone who reads academic papers *and* thinks about typography.
**Audience:** Technical recruiters, quant trading desks, engineering hiring managers, peers.

---

## 2. Tech Stack — Every Decision with Rationale

### Framework: Next.js 16 (App Router)

Use the App Router (not Pages Router). Reasons:
- File-based routing with `app/` directory is the current standard and will not be deprecated.
- `generateMetadata` provides clean, co-located SEO metadata per route.
- React Server Components (RSC) are the default; portfolio data (which is static) never needs client state at the page level.
- Built-in image optimization via `next/image`.
- Zero-config deployment on Vercel (owner already has a Vercel account).
- App Router natively handles `not-found.tsx`, `error.tsx`, `sitemap.ts`, `robots.ts`, and favicon files via file-system conventions — no manual wiring needed.

Do **not** use: Remix, Vite+React, Gatsby, or any static site generator. Next.js is the industry standard and the choice that best positions a quant/CS developer in job conversations.

### Language: TypeScript (strict mode)

Enable strict TypeScript (`"strict": true` in `tsconfig.json`). Every file is `.tsx` or `.ts`. No `.js` or `.jsx` files anywhere in `src/`.

Reasons:
- Typed props contracts on every component serve as living documentation.
- Eliminates entire categories of runtime errors.
- Expected by any serious engineering team Eshan will interview with.

### Styling: Tailwind CSS v4

Use Tailwind v4 for all styling. Tailwind v4 introduces a **CSS-first configuration model** that eliminates `tailwind.config.ts` entirely. All design tokens (colors, fonts, spacing, type scale) are defined using the `@theme` directive inside `globals.css`. This is the canonical approach for v4 and the approach this spec follows.

Reasons:
- Co-located styles eliminate the dead-CSS problem entirely.
- `globals.css` with `@theme` is now the single source of truth for design tokens — one file, one format, no JavaScript config object.
- CSS variables defined in `@theme` are automatically available as Tailwind utility classes (e.g., `--color-accent` → `text-accent`, `bg-accent`).
- Do NOT use CSS Modules, Styled Components, or Emotion. Do NOT use component libraries (shadcn, MUI, Radix UI primitives are acceptable for accessibility utilities only).
- `globals.css` contains: `@import "tailwindcss"`, the `@theme` design token block, grain texture, print stylesheet, scroll behavior, focus ring strategy, and text selection override. Nothing else.

**Migration note:** There is no `tailwind.config.ts` in this project. If a linter or tool expects it, the project is misconfigured. The v4 `@import "tailwindcss"` directive replaces the old `@tailwind base/components/utilities` directives.

### Animation: Framer Motion

Use Framer Motion for all scroll-triggered animations and interactive transitions. Reasons:
- `useInView` hook handles scroll reveals cleanly without manual IntersectionObserver.
- `AnimatePresence` handles mount/unmount transitions for the mobile nav menu.
- `motion.div` components compose cleanly with Tailwind.

Do **not** animate with raw CSS transitions on structural elements. Reserve CSS transitions only for simple hover states (color changes, opacity shifts under 200ms).

### Fonts: Google Fonts via `next/font/google`

Use `next/font/google` — NOT a `<link>` tag. This inlines the font CSS, eliminates a render-blocking request, and is the Next.js-idiomatic approach.

```typescript
// src/lib/fonts.ts
import { DM_Serif_Display, IBM_Plex_Mono } from 'next/font/google'

export const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  display: 'swap',
  preload: true,
})

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  preload: true,
})
```

**Font variable system — two tiers:** `next/font/google` injects `--font-dm-serif-display` and `--font-ibm-plex-mono` as CSS custom properties directly onto the `<html>` element at runtime. These are the injected variables — they live in the DOM, not in Tailwind. The `@theme` block in `globals.css` then defines `--font-serif` and `--font-mono` as aliases that reference them:

```css
--font-serif: var(--font-dm-serif-display), Georgia, serif;
--font-mono:  var(--font-ibm-plex-mono), Menlo, monospace;
```

These `@theme` aliases intentionally override Tailwind v4's built-in `--font-serif` and `--font-mono` tokens, which is correct behaviour — declaring them in `@theme` replaces the Tailwind defaults. The utility classes `font-serif` and `font-mono` are what components use. Do not reference `--font-dm-serif-display` directly in component files; always go through the `font-serif` / `font-mono` utility classes.

Apply both font CSS variable names to the `<html>` tag in `layout.tsx` via `className={`${dmSerifDisplay.variable} ${ibmPlexMono.variable}`}`. This makes the injected variables available to the `@theme` aliases.

**Weight 300 (Light):** IBM Plex Mono is loaded with weights `['300', '400', '500']`. Weight 300 (`font-light`) is used for project card description text to visually de-emphasize body copy beneath the large display name and metric. This is the only place `font-light` is used. Do not add `font-light` elsewhere.

### Data Layer: Static TypeScript Files

All portfolio content (experience, projects, skills, contact links) lives in typed TypeScript data files in `src/data/`. No CMS, no database, no API calls. This is a static personal site. The data layer is a set of plain objects conforming to typed interfaces.

### Deployment: Vercel

Deploy to Vercel. Set up automatic deployments from the `main` branch. No CI/CD configuration needed beyond this — Vercel handles everything. Use a custom domain. Do **not** set `output: 'export'` in `next.config.ts` — Vercel handles React Server Components natively and the static export flag would break them.

---

## 3. Repository Structure

```
eshan-portfolio/
├── public/
│   └── noise.png                # Static 200×200px greyscale noise — generated once at project setup
│
├── src/assets/
│   └── fonts/
│       ├── DMSerifDisplay-Italic.ttf   # Vendored for OG image generation
│       └── IBMPlexMono-Regular.ttf     # Vendored for OG image generation
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout: fonts, metadata, MotionConfig, skip-nav, JSON-LD
│   │   ├── page.tsx             # Single page: assembles all sections
│   │   ├── not-found.tsx        # Custom 404 — matches paper-and-ink aesthetic
│   │   ├── error.tsx            # Error boundary — prevents raw stack traces reaching users
│   │   ├── opengraph-image.tsx  # Programmatic OG image via ImageResponse
│   │   ├── icon.svg             # App Router favicon (replaces public/favicon.ico)
│   │   ├── apple-icon.png       # iOS home screen bookmark icon (180×180px)
│   │   ├── sitemap.ts           # Programmatic sitemap generation
│   │   ├── robots.ts            # Programmatic robots.txt generation
│   │   └── globals.css          # @import tailwindcss + @theme tokens + all global CSS
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── SectionHeader.tsx
│   │       ├── Tag.tsx
│   │       ├── FadeIn.tsx
│   │       └── MetricDisplay.tsx
│   │
│   ├── data/
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   └── skills.ts
│   │
│   ├── types/
│   │   └── index.ts             # All shared TypeScript interfaces
│   │
│   └── lib/
│       ├── constants.ts         # SITE_URL and other shared constants — single source of truth
│       ├── fonts.ts             # next/font/google instances
│       └── parseBullet.ts       # Utility: splits bullet strings at <strong> tags into typed segments
│
├── __tests__/
│   └── parseBullet.test.ts      # Unit test for parseBullet utility
│
├── tsconfig.json
├── next.config.ts               # Security headers, image domains
├── vitest.config.ts             # Test runner configuration
├── .eslintrc.json               # ESLint rules
├── .prettierrc                  # Prettier formatting rules
└── package.json
```

**Rules for this structure:**
- `app/` contains only routing/layout files. No component logic lives here.
- There is no `tailwind.config.ts`. Tailwind v4 uses CSS-first configuration via `@theme` in `globals.css`. Any tool or linter expecting `tailwind.config.ts` indicates a misconfiguration.
- `components/sections/` contains one file per page section. Each section component is a Server Component unless it requires client-side interactivity (e.g. scroll animation hooks), in which case it is a Client Component marked with `'use client'` at the top.
- `components/ui/` contains reusable atomic components used across sections. These must be generic — they must not contain any content or data. They only accept props.
- `components/layout/` contains Nav and Footer. These are distinct from sections.
- `data/` contains no logic — only typed constant objects.
- `types/` contains all shared TypeScript interfaces. No interface is defined inline inside a component file unless it is truly local and used nowhere else.
- `lib/` contains utility functions and configuration that are imported from multiple places. Never put business logic, rendering logic, or component code here.
- `lib/constants.ts` is the single source of truth for values used in more than one file. This prevents the URL from diverging across sitemap, robots, metadata, JSON-LD, and OG image. Import from here everywhere.

---

## 4. TypeScript Interfaces

All data types are defined in `src/types/index.ts`.

```typescript
export interface ExperienceItem {
  company: string
  role: string
  location: string
  dateRange: string
  bullets: string[]           // Supports inline <strong> tags for metric emphasis — parsed by parseBullet() utility, see Section 7
  badge?: string              // e.g. "Incoming" — renders a small outlined label
}

export interface Project {
  index: string               // e.g. "01"
  nameLines: string[]         // Each entry renders on its own line, e.g. ["Auditory", "Intent", "Classifier"]
  italicLine?: number         // 0-based index into nameLines — that line renders italic in text-accent
  description: string
  metric: {
    value: string             // e.g. "1st", "<3s", "100+"
    label: string             // e.g. "out of 500+ participants in UMD ML Competition · 95% F1-score"
  }
  stack: string[]
}

export interface SkillRow {
  category: string
  skills: string
}

export interface NavLink {
  label: string
  href: string
}
```

---

## 5. Design System

The design system is entirely defined in the `@theme` block inside `globals.css`. No design values are hardcoded anywhere else. There is no `tailwind.config.ts`. In Tailwind v4, the `@theme` directive registers CSS custom properties that Tailwind automatically maps to utility classes. If a color, font size, spacing value, or animation duration needs to change, it changes in one place — `globals.css`.

### 5.1 Color Palette

```css
/* In globals.css — @theme block */
@theme {
  --color-paper:         #F5EFE3;   /* Page background. Warm off-white, like quality laid paper. */
  --color-paper-surface: #EDE5D6;   /* Hover state surface for project cards. */
  --color-ink:           #1A1510;   /* Primary text. Warm near-black — not pure #000000. */
  --color-ink-muted:     #736352;   /* Secondary text, labels, dates, metadata. */
  --color-ink-line:      #D9CEBC;   /* Borders, dividers, horizontal rules. */
  --color-accent:        #B5702E;   /* Amber/bronze. Italic text, metrics, badges, hover links. */
}
```

These tokens map directly to Tailwind utility classes: `bg-paper`, `text-ink`, `text-ink-muted`, `border-ink-line`, `text-accent`, `bg-paper-surface`.

**Color rationale:** Most CS portfolios use dark navy + purple gradients. This palette is deliberately warm and editorial, evoking printed paper, academic journals, and financial documents. The amber accent nods to finance and bronze-age precision without being loud.

**Color rules:**
- Background is always `bg-paper`.
- All body text is `text-ink`.
- Secondary labels (dates, role names, section labels) are `text-ink-muted`.
- Borders and dividers are `border-ink-line`.
- `text-accent` is never used as a background. Used exclusively for text and border elements.
- Never add new colors. If a new semantic color is needed, add it to `@theme` — do not hardcode hex values in component files.
- `text-ink-muted` (#736352) on `paper` (#F5EFE3) yields ~4.8:1 contrast ratio — safely above the WCAG AA threshold of 4.5:1. The value was deliberately darkened from the initial `#8A7A68` (which failed) and `#7A6A58` (which was too close to the threshold) to provide a safety margin against monitor calibration variance.

### 5.2 Typography

```css
/* In globals.css — @theme block (continued) */
@theme {
  --font-serif: var(--font-dm-serif-display), Georgia, serif;
  --font-mono:  var(--font-ibm-plex-mono), Menlo, monospace;

  /* Fixed type scale */
  --text-tag:        10px;
  --text-label:      11px;
  --text-body-sm:    12px;
  --text-body-xs:    12.5px;    /* Project card descriptions — lighter than body, heavier than body-sm */
  --text-body:       13px;
  --text-body-md:    14px;
  --text-display-sm: 22px;
  --text-display-md: 28px;

  /* Fluid type scale */
  --text-fluid-tagline: clamp(22px, 2.5vw, 30px);
  --text-fluid-hero:    clamp(80px, 11vw, 160px);
  --text-fluid-contact: clamp(56px, 8vw, 112px);
}
```

`var(--font-dm-serif-display)` and `var(--font-ibm-plex-mono)` are injected by `next/font/google` at the `<html>` tag in `layout.tsx`. The `@theme` variables reference them, making the full font stack available as `font-serif` and `font-mono` Tailwind utilities.

**DM Serif Display** is the display typeface. Use for: the hero name, contact heading, project names, experience company names, and any other large display moment. The italic variant in text-accent is the primary expressive device of this site.

**IBM Plex Mono** is the body typeface. Use for everything else: nav links, section labels, body copy, bullet points, dates, tags, skill lists. Do not use any other typeface.

**Type scale:**

| Usage | Tailwind Class | Size | Notes |
|---|---|---|---|
| Hero name | `text-fluid-hero` | clamp(80–160px) | `font-serif`, `leading-none` |
| Contact heading | `text-fluid-contact` | clamp(56–112px) | `font-serif italic`, accent |
| Hero tagline | `text-fluid-tagline` | clamp(22–30px) | `font-serif`, may use italic |
| Project name / metrics | `text-display-md` | 28px | `font-serif`, may use italic |
| Company name | `text-display-sm` | 22px | `font-serif` |
| Skills value | `text-body-md` | 14px | `font-mono` |
| Body / bullets | `text-body` | 13px | `font-mono` |
| Role / location | `text-body-sm` | 12px | `font-mono` |
| Project descriptions | `text-body-xs` | 12.5px | `font-mono font-light`, `text-ink-muted` |
| Labels / dates / nav | `text-label` | 11px | `font-mono`, `uppercase`, `tracking-widest` |
| Tags / badges | `text-tag` | 10px | `font-mono`, `uppercase`, `tracking-wide` |

**Typography rules:**
- Never use `font-bold` (`font-weight: 700`). Use `font-medium` (500) for subtle emphasis.
- Never use raw arbitrary pixel brackets for font sizes: `text-[11px]` is prohibited. Use the named token `text-label` instead.
- All label instances share identical classes. Define them once in `SectionHeader.tsx`, compose elsewhere.

### 5.3 Spacing

```css
/* In globals.css — @theme block (continued) */
@theme {
  --spacing-section-y:  88px;   /* Canonical section vertical padding */
  --spacing-skills-cat: 100px;  /* Min-width of the skills category label column */
  --spacing-skills-max: 860px;  /* Max-width of the skills table container */
}
```

Key layout values:
- Page horizontal padding (desktop): `px-14` = 56px (default Tailwind scale)
- Page horizontal padding (mobile): `px-7` = 28px
- Section vertical padding: `py-section-y` = 88px
- Section header bottom margin: `mb-16` = 64px
- Between experience items: top border + `py-9` = 36px padding each side
- Project card internal padding: `p-10` = 40px

Use responsive variants for all layout padding. Never hardcode pixel values in `style={}` attributes.

### 5.4 Animation & Global CSS Tokens

```css
/* In globals.css — @theme block (continued) */
@theme {
  --duration-fast:   200ms;
  --duration-reveal: 650ms;
  --ease-reveal:     cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Scroll reveal:** Every section fades in and translates up 24px when it enters the viewport. Handled by `FadeIn.tsx` using Framer Motion's `useInView`. Duration `0.65s`, easing `var(--ease-reveal)`. Threshold `0.08`. The `motion.div` must explicitly declare `initial={{ opacity: 0, y: 24 }}` — do not omit this. Without it, elements can flash fully visible on server-rendered HTML before the client JavaScript executes.

**No stagger animations.** Sections animate as complete units — the entire section fades in together. Do not stagger individual experience bullets, project cards, or skill rows. Stagger adds implementation complexity and visual noise without meaningfully improving the editorial feel.

**Hover states:** Color transitions only. Duration `200ms ease`. No translate or scale on hover for structural elements.

**Grain texture:** Static tiling noise PNG — see Section 5.5.

**Scroll behaviour:** Smooth scroll anchoring is defined globally in `globals.css`. Wrapped in a reduced-motion media query:

```css
/* In globals.css */
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

**Scrollbar gutter:** When the mobile nav opens and `overflow: hidden` is applied to `body`, the disappearing scrollbar causes a horizontal layout shift. Prevent this globally:

```css
/* In globals.css */
html { scrollbar-gutter: stable; }
```

**Focus ring strategy:** All interactive elements must use a consistent focus ring. Define globally and rely on Tailwind's `focus-visible` variant:

```css
/* In globals.css */
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-paper), 0 0 0 4px var(--color-accent);
}
```

This creates a two-layer ring: an inner `paper` gap and an outer `accent` ring. It is visible on all backgrounds used in this site.

**Text selection override:** The default browser blue selection color breaks the warm editorial aesthetic:

```css
/* In globals.css */
::selection {
  background-color: color-mix(in srgb, var(--color-accent) 20%, transparent);
  color: var(--color-ink);
}
```

### 5.5 Grain Texture

Do not use an inline SVG `feTurbulence` filter — it is re-evaluated by the GPU on every scroll frame, causing measurable CPU overhead on mobile that shows up in SpeedInsights INP data.

Instead, generate a static 200×200px greyscale noise PNG once and tile it via CSS. The PNG is generated at project setup and placed in `/public/noise.png`. Any noise generator tool works — target a greyscale fractal noise texture exported as PNG.

```css
/* In globals.css */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/noise.png');
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.045;
  pointer-events: none;
  z-index: 9000;
}
```

`background-size: 200px 200px` controls grain scale — smaller = finer, larger = coarser. 200px is correct for this aesthetic.

---

## 6. Component Architecture

### 6.1 Principles

**Single Responsibility Principle (SRP):** Each component does exactly one thing.
- `SectionHeader` renders a section header. It does not know what section it's in.
- `FadeIn` handles scroll-reveal animation. It wraps any child — it has no opinion on content.
- `Tag` renders a single technology tag. It does not render a list of tags.
- `MetricDisplay` renders a metric value + label pair. Nothing else.

**DRY (Don't Repeat Yourself):**
- The section header pattern (number + label + horizontal rule) appears 5 times. It is a component, not copy-pasted markup.
- The tag pattern appears across all 3 project cards. `Tag` is a component.
- The amber metric display (large serif number + mono label) appears in every project card. `MetricDisplay` is a component.
- All animation behavior (scroll fade-in) is encapsulated in `FadeIn`.

**KISS (Keep It Short and Simple):**
- No abstraction layer unless a pattern appears 3 or more times.
- No render props, HOCs, or context unless genuinely needed.
- No state management library. The only state that exists is Framer Motion's internal animation state and a single boolean for mobile nav open/closed.
- No custom hooks unless the logic is reused in 2+ places.

**Component purity:** Section components are pure — given the same data, they always produce the same output. They receive data from `src/data/` files (imported directly), not from props passed down from `page.tsx`. This keeps `page.tsx` clean and keeps the data co-located with the sections that use it.

### 6.2 Component Specifications

#### `FadeIn.tsx`

Full implementation:

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number   // in seconds — default 0. Only use for deliberate sequencing, not decorative stagger.
}

export default function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
```

The `margin: '-80px'` on `useInView` means the animation fires when the element is 80px into the viewport — a comfortable trigger that avoids firing too early on fast scrolls. `once: true` ensures the animation plays only once per page load and is not retriggered on scroll-back.

`FadeIn.tsx` does **not** need to check `useReducedMotion()` internally. Reduced motion and print visibility are handled globally by `MotionConfig` in `layout.tsx` — see Section 8.

**Framer Motion bundle size:** Because `FadeIn.tsx` is the only component importing Framer Motion, the entire library enters the initial client bundle through this one file. Framer Motion is approximately 50KB gzipped. If bundle analysis (`next build && npx @next/bundle-analyzer`) shows it materially blocking the main thread, load `FadeIn` via `next/dynamic` with `ssr: false`:

```typescript
// In any section component that uses FadeIn
import dynamic from 'next/dynamic'
const FadeIn = dynamic(() => import('@/components/ui/FadeIn'), { ssr: false })
```

This defers Framer Motion to a separate chunk loaded after the initial paint, which improves LCP. The trade-off is that scroll reveals won't fire until after hydration — acceptable for a portfolio since the animations are decorative. Do not apply `next/dynamic` preemptively; run bundle analysis first and only apply it if the impact is measurable.

#### `SectionHeader.tsx`

```typescript
interface SectionHeaderProps {
  number: string   // e.g. "02"
  label: string    // e.g. "Experience"
}
```

Renders: section number + section label + a flex-grow horizontal rule. No animation — the parent `FadeIn` handles that.

**Accessibility:** A screen reader would narrate the number and slash literally ("zero two slash Experience") without explicit ARIA. Apply `aria-hidden="true"` to the section number span and the decorative horizontal rule. Apply an `aria-label` to the wrapping container so the section is still announced meaningfully:

```tsx
<div className="..." aria-label={props.label}>
  <span aria-hidden="true" className="text-label text-accent">{props.number}</span>
  <span className="text-label uppercase tracking-widest text-ink-muted">{props.label}</span>
  <div aria-hidden="true" className="flex-1 h-px bg-ink-line" />
</div>
```

The `label` text itself is not `aria-hidden` — only the numeric prefix and the decorative rule are suppressed. Screen readers will announce the section name cleanly without the structural chrome.

#### `Tag.tsx`

```typescript
interface TagProps {
  label: string
}
```

Renders a single tag pill: 10px mono uppercase, `text-ink-muted` text, `border-ink-line` border, `px-2 py-0.5`. No state, no interaction.

#### `MetricDisplay.tsx`

```typescript
interface MetricDisplayProps {
  value: string    // e.g. "1st", "<3s", "100+"
  label: string    // e.g. "out of 500+ participants..."
}
```

Renders the value in `font-serif text-display-md text-accent`, then the label in `font-mono text-body-sm text-ink`. Separated from the project description above by `border-t border-ink-line`.

#### `Nav.tsx`

Client component (`'use client'` — needs `useState` for mobile menu and `useEffect` for active section tracking). Fixed position, `z-50`. Blurred background via `backdrop-blur-sm bg-paper/90`. Contains: wordmark (DM Serif Display 17px, links to `#`) on the left; nav links on the right.

**Nav link styles:** `text-label font-mono uppercase tracking-widest text-ink-muted hover:text-accent transition-colors`. Active link (the section currently in the viewport) additionally receives `text-ink` (full ink color) to distinguish it from muted inactive links.

**Active section tracking:**

```typescript
// Inside Nav.tsx — simplified active section logic
const [activeSection, setActiveSection] = useState<string>('')
// An empty string is the intentional initial state — no nav link appears active until
// the user has scrolled past the hero. This is correct behaviour.

useEffect(() => {
  const sections = document.querySelectorAll('section[id]')
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    },
    { rootMargin: '-20% 0px -65% 0px' }  // 15% activation band near the top third of viewport
  )
  sections.forEach(s => observer.observe(s))
  return () => observer.disconnect()
}, [])
```

The `rootMargin` of `-20% 0px -65% 0px` creates a 15% activation band (the region between 20% from the top and 35% from the bottom of the viewport). This is wide enough that the active state doesn't flicker when the user scrolls quickly or when two sections share a boundary. The previous 5% band (`-40% 0px -55% 0px`) was too narrow and caused flickering on fast trackpad scrolls.

**Mobile nav — full specification:**

On mobile (`< md`), the nav links are hidden and replaced with a hamburger toggle. The hamburger button and mobile menu have the following requirements:

```tsx
// Inside Nav.tsx render, after the wordmark and desktop nav links:
const [menuOpen, setMenuOpen] = useState(false)

// Body scroll lock — prevent scroll behind open menu
useEffect(() => {
  document.body.style.overflow = menuOpen ? 'hidden' : ''
  return () => { document.body.style.overflow = '' }
}, [menuOpen])

// Hamburger button (visible only on mobile)
<button
  onClick={() => setMenuOpen(prev => !prev)}
  aria-expanded={menuOpen}
  aria-controls="mobile-menu"
  aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
  className="md:hidden p-3 -mr-3 text-ink-muted hover:text-accent transition-colors"
>
  {/* 18px icon; p-3 expands touch target to 44px minimum */}
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    {menuOpen ? (
      // × icon
      <>
        <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ) : (
      // ≡ icon
      <>
        <line x1="2" y1="5"  x2="16" y2="5"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="2" y1="9"  x2="16" y2="9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    )}
  </svg>
</button>

// Mobile menu (AnimatePresence handles mount/unmount)
<AnimatePresence>
  {menuOpen && (
    <motion.div
      id="mobile-menu"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="absolute top-full left-0 right-0 bg-paper/95 backdrop-blur-sm border-b border-ink-line md:hidden overflow-hidden"
    >
      <nav className="flex flex-col px-7 py-4 gap-1">
        {NAV_LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="text-label font-mono uppercase tracking-widest text-ink-muted hover:text-accent transition-colors py-3"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.div>
  )}
</AnimatePresence>
```

The `py-3` on each mobile nav link ensures a 44px minimum touch target. Clicking any nav link closes the menu. The body scroll lock (`overflow: hidden`) is applied when the menu opens and cleaned up on close and on component unmount. `AnimatePresence` must wrap the conditional — `motion.div` without `AnimatePresence` does not animate on exit.

**Nav data:**

```typescript
// Inside Nav.tsx (not from src/data/ — nav links are layout concerns, not content)
const NAV_LINKS: NavLink[] = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Contact',    href: '#contact'    },
]
```

#### `Footer.tsx`

Server component. Simple two-column row: copyright on the left, location on the right. `text-label font-mono text-ink-muted`. `px-14 py-5 border-t border-ink-line`.

---

## 7. Section-by-Section Specifications

### 7.1 Hero

**Component:** `Hero.tsx` — Server Component.

**Layout:** Two rows. Top row: 2-column grid (`grid-cols-2`). Bottom row: flex row, space-between.

**Top-left:** The hero name. Two lines: "Eshan" then "Khan." with "Khan" in italic DM Serif Display, text-accent. Apply `text-fluid-hero`. Line height `leading-none` (0.88 effective). This is the visual anchor of the entire page.

**Top-right:** A descriptor block aligned to the bottom of the name column (use `items-end` on the parent grid). Contains:
1. A section label: `01 / Overview` in the label style (11px mono uppercase text-accent).
2. A tagline in DM Serif Display (`text-fluid-tagline`): "Building at the edge of *mathematics,* markets, and systems." — the word "mathematics" is in italic text-accent using an `<em>` tag.
3. A metadata block: 4 lines of 12px mono `text-ink-muted` text listing degree, university, GPA, incoming role, current role. University name and company names are `font-medium text-ink`.

**Bottom row:** Horizontal rule above it (`border-t border-ink-line mt-16 pt-8`). Left side: "Scroll to explore" in label style. Right side: four links (Email, LinkedIn, GitHub, Resume) in label style, `text-ink-muted`, `hover:text-accent`. LinkedIn and GitHub open in a new tab: `target="_blank" rel="noopener noreferrer"`. Email uses `href="mailto:..."`. Resume link points to a PDF in `/public/` or an external URL.

**Behavior:** The hero does NOT use `FadeIn`. It is immediately visible on page load. No scroll-reveal on the hero.

**Min-height:** `min-h-screen min-h-[100svh]`. The `min-h-screen` (100vh) fallback handles older browsers; `min-h-[100svh]` overrides it on mobile Safari where `100vh` incorrectly includes the retractable browser chrome, causing the hero to overflow and require scrolling before the page begins. `svh` (small viewport height) uses the smallest possible viewport height — the correct value on mobile.

### 7.2 Experience

**Component:** `Experience.tsx` — Server Component (wraps itself in a single `<FadeIn>`). Outermost element is `<section id="experience">`.

**Data source:** Imports `EXPERIENCE` array from `src/data/experience.ts`.

**Layout:** `SectionHeader` with number "02" and label "Experience". Then a list of `ExperienceItem` entries.

**Each experience item:**
- 3-column grid: `grid-cols-[200px_1fr_160px]` on desktop. Stacks to single column on mobile.
- Column 1: Company name in DM Serif Display 22px. If `badge` is present, render it below the company name as an outlined label (`border border-accent text-accent text-tag font-mono uppercase tracking-wide px-2 py-0.5 inline-block mt-1.5`).
- Column 2: Role + location in `text-body-sm font-mono text-ink-muted mb-4`, then an unordered list of bullet points. Each bullet uses a CSS `::before` pseudo-element of "—" in text-accent instead of a disc. Bullet text is 13px mono `text-ink`. Within bullet text, numbers and key metrics are visually emphasized using `<strong className="font-medium text-accent">`.

  **Do not use `dangerouslySetInnerHTML` for this.** Instead, use the `parseBullet` utility function defined in `src/lib/parseBullet.ts`:

  ```typescript
  // src/lib/parseBullet.ts
  import React from 'react'

  type BulletSegment = { text: string; strong: boolean }

  export function parseBullet(raw: string): BulletSegment[] {
    const parts = raw.split(/(<strong>|<\/strong>)/)
    const segments: BulletSegment[] = []
    let inStrong = false
    for (const part of parts) {
      if (part === '<strong>')       { inStrong = true;  continue }
      if (part === '</strong>')      { inStrong = false; continue }
      if (part.length > 0) segments.push({ text: part, strong: inStrong })
    }
    return segments
  }
  ```

  Usage in the component:

  ```tsx
  {parseBullet(bullet).map((segment, i) =>
    segment.strong
      ? <strong key={i} className="font-medium text-accent">{segment.text}</strong>
      : <React.Fragment key={i}>{segment.text}</React.Fragment>
  )}
  ```

  This produces identical rendered output with no linter warnings, no XSS surface, and is fully typed. `parseBullet` is a pure function — it is unit-testable and takes no React dependency. Place it in `src/lib/` since it may be reused anywhere inline HTML parsing is needed.

  **Robustness note:** `parseBullet` assumes perfectly paired `<strong>...</strong>` tags in the input string. It has no recovery logic for dangling or mismatched tags — a missing `</strong>` will cause all subsequent text in the bullet to render as bold. Since the `bullets` arrays in `src/data/experience.ts` are static and developer-authored, this is acceptable. However, every string containing `<strong>` tags in the data files must be manually validated during development to ensure proper pairing. The unit test in `__tests__/parseBullet.test.ts` verifies this — see Section 18.

- Column 3: Date range. `text-label font-mono text-ink-muted text-right`. On mobile, `text-left`.

**Separators:** Each item has `border-t border-ink-line`. The final item also has `border-b border-ink-line`. There is no gap between items — only the padding within each item.

**Experience data (`src/data/experience.ts`):**

```typescript
export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'IMC Trading',
    role: 'Quantitative Trader Intern',
    location: 'Chicago, IL',
    dateRange: 'Jun. 2026 – Aug. 2026',
    badge: 'Incoming',
    bullets: [
      'Joining IMC\'s Chicago trading floor Summer 2026 — focusing on derivatives market-making and quantitative signal research.',
    ],
  },
  {
    company: 'Apex Fund',
    role: 'Quantitative Developer',
    location: 'College Park, MD',
    dateRange: 'Sep. 2024 – Present',
    bullets: [
      'Deployed an algorithmic market-making bot on Kalshi via REST/WebSocket APIs, generating <strong>2% monthly returns</strong> on weather derivative bid-ask spreads.',
      'Built a volatility arbitrage model using IV/RV ratios and term structure signals across <strong>72,000+ earnings events</strong> — Monte Carlo backtests yielded <strong>9% CAGR</strong> and <strong>2.1 Sharpe</strong> with Kelly sizing.',
      'Achieved <strong>83% accuracy</strong> predicting oil market anomalies using SVMs and isolation forests with JAX and XArray.',
    ],
  },
  {
    company: 'Technuf',
    role: 'Software Engineer Intern',
    location: 'Rockville, MD',
    dateRange: 'Jun. 2022 – Aug. 2022',
    bullets: [
      'Created Aphelia StudentConnect, a mobile app deployed to <strong>6+ public schools</strong> and a nonprofit, enabling attendance tracking and engagement analytics.',
      'Built a Flutter/Dart barcode scanning system with MySQL backend and RESTful API — reduced manual error by <strong>85%</strong>.',
      'Implemented a local SQLite database managing <strong>1,700+ students</strong> with full CRUD operations.',
    ],
  },
]
```

### 7.3 Projects

**Component:** `Projects.tsx` — Server Component (wraps in `<FadeIn>`). Outermost element is `<section id="projects">`.

**Data source:** Imports `PROJECTS` array from `src/data/projects.ts`.

**Layout:** `SectionHeader` with "03" / "Selected Projects". Then a 3-column grid with a hairline border grid effect.

**Grid technique:** The outer container has `border border-ink-line`. Each card has `border-r border-ink-line` except the last (`:last-child { border-right: none }`). This creates the visual effect of a bordered grid without double borders. On mobile, the grid collapses to 1 column; each card has `border-b border-ink-line` and `border-r-0`.

**Each project card:**
- Internal padding: `p-10` (40px).
- `hover:bg-paper-surface transition-colors duration-200`
- Top: project index in label style, text-accent.
- Project name: Each entry in `nameLines` is on its own line using `<br />`. DM Serif Display 28px. One line (the entry at `italicLine` index) is italic in text-accent to create visual rhythm.
- Description: `text-body-xs font-mono font-light text-ink-muted leading-relaxed`.
- `MetricDisplay` component at the bottom, separated from description by `border-t border-ink-line mt-auto pt-4`.
- Tags: row of `Tag` components below the metric.

**Projects data (`src/data/projects.ts`):**

```typescript
export const PROJECTS: Project[] = [
  {
    index: '01',
    nameLines: ['Auditory', 'Intent', 'Classifier'],
    italicLine: 1,
    description: 'Full ML pipeline classifying expressive intent from nonverbal vocalizations to support autism research. Built with PyTorch and Librosa, processing 7,000+ audio samples with MFCCs, spectral entropy, and Mel spectrograms.',
    metric: {
      value: '1st',
      label: 'out of 500+ participants in UMD ML Competition · 95% F1-score with vision transformers',
    },
    stack: ['PyTorch', 'Scikit-learn', 'Librosa', 'Keras'],
  },
  {
    index: '02',
    nameLines: ['Poisson', 'Disk', 'Sequences'],
    italicLine: 1,
    description: "Bridson's Poisson-Disk sampling algorithm in Rust generating distance-constrained 2D point distributions for procedural content generation. Optimized spatial grid structures for linear runtime, compiled to WebAssembly for in-browser visualization.",
    metric: {
      value: '<3s',
      label: 'in-browser render via WebAssembly · linear runtime with optimized spatial grids',
    },
    stack: ['Rust', 'WebAssembly'],
  },
  {
    index: '03',
    nameLines: ['Palette', 'Canvas', 'AI'],
    italicLine: 1,
    description: 'Chrome extension providing automated academic insights within Canvas LMS. Privacy-first: all data is processed on-device via a locally hosted LLM. No user data ever leaves the browser.',
    metric: {
      value: '100+',
      label: 'active student users · zero server-side data processing',
    },
    stack: ['React', 'Node.js', 'Docker'],
  },
]
```

**Note on `italicLine`:** The interface specifies `italicLine` as an optional `number` — a 0-based index into `nameLines`. Using an index rather than a string match prevents ambiguity if two lines ever share the same word. The component maps over `nameLines` using both value and index:

```tsx
{project.nameLines.map((line, i) => (
  <span
    key={i}
    className={i === project.italicLine ? 'italic text-accent' : ''}
  >
    {line}
    {i < project.nameLines.length - 1 && <br />}
  </span>
))}
```

### 7.4 Skills

**Component:** `Skills.tsx` — Server Component (wraps in `<FadeIn>`). Outermost element is `<section id="skills">`.

**Data source:** Imports `SKILLS` from `src/data/skills.ts`.

**Layout:** `SectionHeader` with "04" / "Skills". Then a `max-w-skills-max` container with rows.

**Each skill row:** Flex row with `border-t border-ink-line py-4`. The category label is `text-tag font-mono uppercase tracking-widest text-ink-muted min-w-skills-cat`. The skills value is `text-body-md font-mono text-ink`. The last row also has `border-b border-ink-line`.

**No icons.** No logos. No skill bars or percentage indicators. A comma-separated list in clean mono type communicates the same information with more dignity.

**Skills data (`src/data/skills.ts`):**

```typescript
export const SKILLS: SkillRow[] = [
  { category: 'Languages',     skills: 'Python, Java, C, C++, JavaScript, TypeScript, Rust, OCaml, SQL, R' },
  { category: 'ML / Quant',    skills: 'PyTorch, NumPy, pandas, Scikit-learn, JAX, XArray, Librosa, Keras' },
  { category: 'Web / Backend', skills: 'React, Next.js, Node.js, Spring Boot, Django, REST, WebSocket' },
  { category: 'Infrastructure', skills: 'AWS, Docker, Kubernetes, Linux/Unix, Git, Maven' },
  { category: 'Coursework',    skills: 'Machine Learning, Compilers, Computer Systems, Algorithms, Real Analysis, Linear Algebra, Data Science, Statistics' },
]
```

### 7.5 Contact

**Component:** `Contact.tsx` — Server Component (wraps in `<FadeIn>`). Outermost element is `<section id="contact">`.

**Layout:** `SectionHeader` with "05" / "Contact". Then a flex row, `justify-between items-end`.

**Left:** Large display heading in DM Serif Display. "Let's" on line one, italic "talk." on line two in text-accent. Apply `text-fluid-contact`. This is the last big typographic moment on the page and should have visual weight.

**Right:** Column of contact links, `text-right`, `gap-3`. Each link is 13px mono `text-ink-muted` with `hover:text-accent transition-colors`. Minimum touch target `py-2`. Links: email, phone, LinkedIn, GitHub, personal site. All open appropriately (`mailto:`, `tel:`, external `target="_blank" rel="noopener noreferrer"`).

**On mobile:** Stack left and right vertically. Left heading first, then links left-aligned below.

---

## 8. Page Assembly

### `src/lib/constants.ts`

This file is the single source of truth for values used in more than one location. Import from here rather than hardcoding strings.

```typescript
// src/lib/constants.ts
export const SITE_URL         = 'https://eshankhan.vercel.app'
export const SITE_NAME        = 'Eshan Khan'
export const SITE_DESCRIPTION = 'CS + Mathematics @ UMD. Incoming Quant Trader at IMC Trading. Building at the edge of mathematics, markets, and systems.'
export const SITE_EMAIL       = 'eakhan37@gmail.com'
export const SITE_LINKEDIN    = 'https://linkedin.com/in/eshankhan05'
export const SITE_GITHUB      = 'https://github.com/eshan327'
```

Import `SITE_URL` in `sitemap.ts`, `robots.ts`, `layout.tsx` (metadata and JSON-LD), and `opengraph-image.tsx`. Never hardcode `https://eshankhan.vercel.app` in a component file.

### `src/app/page.tsx`

```typescript
// src/app/page.tsx
import Hero       from '@/components/sections/Hero'
import Experience from '@/components/sections/Experience'
import Projects   from '@/components/sections/Projects'
import Skills     from '@/components/sections/Skills'
import Contact    from '@/components/sections/Contact'

export default function Home() {
  return (
    <main id="content">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}
```

`id="content"` is required — the skip-to-main-content link in `layout.tsx` points to `#content`. Without it, the skip link scrolls to the top of the page instead of the main content.

### `src/app/layout.tsx`

`layout.tsx` applies fonts to `<html>`, sets metadata and viewport, renders `<Nav>`, wraps `{children}` in `<MotionConfig>`, renders `<Footer>`, injects JSON-LD structured data, and includes a skip-to-main-content link.

**`lang` attribute:** The `<html>` tag must carry `lang="en"`. This is required for screen readers to correctly interpret the language of the page.

**Metadata and Viewport exports:**

```typescript
import type { Metadata, Viewport } from 'next'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_NAME,
    description: 'CS + Mathematics @ UMD. Incoming Quant Trader at IMC Trading.',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
}

// viewport is a separate export in Next.js App Router — not part of metadata
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5EFE3',   // Matches --color-paper; tints mobile browser chrome to match the site
}
```

`themeColor` sets the browser chrome (address bar, tab bar) on mobile to match the site's paper background. Without it, the chrome stays the browser default (white or gray), breaking the editorial aesthetic on mobile.

**Skip-to-main-content link:** Required for keyboard navigation. Place as the very first child of `<body>`, before `<Nav>`:

```tsx
<a
  href="#content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-paper focus:text-ink focus:border focus:border-ink-line focus:text-label focus:uppercase focus:tracking-widest"
>
  Skip to content
</a>
```

**MotionConfig** is the canonical place to handle reduced motion for the entire app:

```tsx
import { MotionConfig } from 'framer-motion'

// Inside the layout's <body>:
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>
```

`reducedMotion="user"` reads the OS-level `prefers-reduced-motion` media query and, when set, disables all animations across every `motion.*` element in the tree — including `FadeIn`. This applies automatically to print contexts in browsers that honour the media query during printing. Do not add `useReducedMotion()` calls inside individual components.

**JSON-LD Structured Data:**

```tsx
import { SITE_URL, SITE_NAME, SITE_EMAIL, SITE_LINKEDIN, SITE_GITHUB } from '@/lib/constants'

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      email: SITE_EMAIL,
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Maryland, College Park' },
      worksFor: { '@type': 'Organization', name: 'Apex Fund' },
      sameAs: [SITE_LINKEDIN, SITE_GITHUB],
    }),
  }}
/>
```

This is one of the very few legitimate uses of `dangerouslySetInnerHTML` — JSON-LD must be injected as raw script content and cannot be expressed as JSX attributes. The data is static and trusted; there is no XSS risk.

**Vercel Analytics and Speed Insights:**

```tsx
import { Analytics }     from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// Inside the layout's <body>, after {children}:
{children}
<Analytics />
<SpeedInsights />
```

Both are zero-configuration and add negligible bundle weight. `SpeedInsights` reports real-user Core Web Vitals from actual recruiter sessions — this is the feedback loop that tells you whether the performance targets in this spec are being met in practice.

### Additional App Router files

**`not-found.tsx`** — Custom 404. Must be a Server Component. Matches the paper-and-ink aesthetic:

```tsx
// src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-14">
      <div>
        <p className="text-label font-mono uppercase tracking-widest text-accent mb-4">404</p>
        <h1 className="text-display-md font-serif italic text-ink mb-6 leading-none">
          Page not found.
        </h1>
        <p className="text-body font-mono text-ink-muted mb-8">
          This page does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="text-label font-mono uppercase tracking-widest text-ink-muted hover:text-accent transition-colors border-b border-ink-line hover:border-accent pb-0.5"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
```

**`error.tsx`** — Error boundary for Server Component failures. Must be a Client Component (`'use client'`). Receives `error: Error & { digest?: string }` and `reset: () => void` props from Next.js:

```tsx
// src/app/error.tsx
'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-14">
      <div>
        <p className="text-label font-mono uppercase tracking-widest text-accent mb-4">Error</p>
        <h1 className="text-display-md font-serif italic text-ink mb-6 leading-none">
          Something went wrong.
        </h1>
        <p className="text-body font-mono text-ink-muted mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="text-label font-mono uppercase tracking-widest text-ink-muted hover:text-accent transition-colors border-b border-ink-line hover:border-accent pb-0.5"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
```

**`icon.svg`** — App Router favicon. The design is a single italic "E" in DM Serif Display, rendered in `#B5702E` (accent) on a `#F5EFE3` (paper) background, with 10% padding on all sides. The background fill uses the paper color with no border. At 32×32px (the canonical favicon render size) this reads as a clean amber lettermark. Place `icon.svg` in `src/app/` — Next.js automatically serves it at `/favicon.ico` and `/icon.svg` without any `<link>` tags.

**`sitemap.ts`** and **`robots.ts`:**

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }]
}
```

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE_URL}/sitemap.xml` }
}
```

---

## 9. SEO & OG Image

The OG image is generated programmatically via `src/app/opengraph-image.tsx` using Next.js's built-in `ImageResponse` API. It renders the warm paper background, the name in DM Serif Display, and the tagline in IBM Plex Mono. Output size: 1200×630.

**Critical — fonts in `ImageResponse`:** `next/og` cannot inherit CSS variables or `next/font/google` instances from `layout.tsx`. Font files must be fetched as `ArrayBuffer` objects and passed into the `fonts` array of the `ImageResponse` options.

Place the `.ttf` files in `src/assets/fonts/`. Use `fetch(new URL(..., import.meta.url))` — Vercel's bundler can statically trace `import.meta.url` and correctly includes referenced asset files in the function bundle. Do not use `fs.readFileSync` or fetch from the Google Fonts CDN.

```typescript
// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export const runtime     = 'edge'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const [dmSerifItalic, ibmPlexMono] = await Promise.all([
    fetch(new URL('../../assets/fonts/DMSerifDisplay-Italic.ttf', import.meta.url))
      .then(res => res.arrayBuffer()),
    fetch(new URL('../../assets/fonts/IBMPlexMono-Regular.ttf', import.meta.url))
      .then(res => res.arrayBuffer()),
  ])

  return new ImageResponse(
    (
      <div style={{ background: '#F5EFE3', width: '100%', height: '100%', display: 'flex',
                    flexDirection: 'column', justifyContent: 'space-between', padding: '80px' }}>
        <p style={{ fontFamily: 'IBM Plex Mono', fontSize: 18, color: '#736352',
                    letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          {SITE_URL.replace('https://', '')}
        </p>
        <div>
          <h1 style={{ fontFamily: 'DM Serif Display', fontStyle: 'italic', fontSize: 120,
                       color: '#B5702E', lineHeight: 0.88, margin: '0 0 32px' }}>
            {SITE_NAME}.
          </h1>
          <p style={{ fontFamily: 'IBM Plex Mono', fontSize: 22, color: '#1A1510', margin: 0 }}>
            {SITE_DESCRIPTION}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'DM Serif Display', data: dmSerifItalic, style: 'italic' },
        { name: 'IBM Plex Mono',    data: ibmPlexMono,   style: 'normal' },
      ],
    }
  )
}
```

**Note:** The relative path in `new URL('../../assets/fonts/...', import.meta.url)` resolves from the compiled output location of `opengraph-image.tsx` inside `.next/`. The `../../` traversal depth is correct for the default Next.js 16 output structure. If build errors indicate font files cannot be found, verify the path depth matches your actual output structure by inspecting `.next/server/app/`.

---

## 10. Security Headers

Define security headers in `next.config.ts` via the `headers()` function. This demonstrates systems-level security awareness and protects against XSS and data injection attacks.

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // 'unsafe-inline' required for: Next.js style injection, JSON-LD <script> tag, Tailwind utilities
              "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              // next/font/google downloads fonts at build time and serves them from /_next/static/
              // No external font CDN requests are made at runtime — 'self' is sufficient
              "font-src 'self'",
              "img-src 'self' data: blob:",
              // Vercel Speed Insights beacon
              "connect-src 'self' https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
          { key: 'X-Frame-Options',        value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default config
```

**Vercel Analytics domains:** The `va.vercel-scripts.com` and `vitals.vercel-insights.com` domains are correct as of this writing. Verify against Vercel's current documentation if the analytics components emit CSP violations in the browser console — Vercel occasionally updates script origins.

---

## 11. Performance

### Core Web Vitals targets
- LCP < 1.2s (hero text is text, not an image — no LCP image issue)
- CLS = 0 (fonts use `display: swap` and explicit size properties to prevent layout shift)
- FID / INP < 100ms (minimal client-side JS)

### Bundle size

The site should have minimal JavaScript. All section components are Server Components. Only `Nav.tsx` and `FadeIn.tsx` are Client Components. Keep Framer Motion tree-shakeable by importing from `framer-motion` (not `framer-motion/dist/...`).

### Images

There are no images on the site. The design is intentionally typography-only. If a headshot is ever added, use `next/image` with explicit `width` and `height` and `priority` on above-the-fold images.

---

## 12. Print Stylesheet

The spec states "the site is the resume." Recruiters frequently press Cmd+P / Ctrl+P to save the page as a PDF. A print stylesheet is required. Add it to `globals.css`:

```css
@media print {
  /* Hide navigation chrome and footer */
  nav, footer { display: none; }

  /* Remove grain texture */
  body::before { display: none; }

  /* Force white background and black ink regardless of screen palette */
  body, .hero, .section, #contact {
    background: #ffffff !important;
    color: #000000 !important;
  }

  /* Ensure text-accent prints legibly on non-color printers */
  .text-accent, em { color: #000000 !important; font-style: italic; }

  /* Single-column layout for all grid sections */
  .hero-top,
  .exp-item,
  .projects-grid { grid-template-columns: 1fr !important; }

  /* Remove scroll-reveal opacity — everything must be visible */
  .section, #contact { opacity: 1 !important; transform: none !important; }

  /* Prevent awkward page breaks mid-item */
  .exp-item, .proj-card { page-break-inside: avoid; }

  /* Prevent orphaned headings — require at least 3 lines after a heading before a page break */
  h1, h2, h3 { widows: 3; orphans: 3; }

  /* Remove backdrop blur from nav (already hidden, but belt-and-suspenders) */
  nav { backdrop-filter: none; }

  /* Collapse hero min-height — no need to fill a viewport on paper */
  .hero { min-height: unset; padding-top: 40px; }
}
```

**Implementation note:** Because Framer Motion applies `opacity` and `transform` via inline styles (not classes), the CSS `opacity: 1 !important` override above may not reliably win against Framer Motion's inline style values for sections that have not yet scrolled into view. This is fully handled by the `MotionConfig reducedMotion="user"` wrapper in `layout.tsx` (see Section 8), which disables all Framer Motion animations — including initial state — when `prefers-reduced-motion` is active. Since most browsers honour this media query during printing, `FadeIn`-wrapped sections will render fully visible in print. No additional per-component logic is needed in `FadeIn.tsx`.

---

## 13. Accessibility

- All interactive elements (nav links, contact links) are `<a>` tags, not `<div onClick>`.
- **Color contrast:** `text-ink-muted` (#736352) on `paper` (#F5EFE3) yields ~4.8:1 — safely above the WCAG AA threshold of 4.5:1.
- The grain texture overlay is `pointer-events: none` and invisible to screen readers. Because it is generated purely via a CSS `::before` pseudo-element with no textual `content` value, it produces no DOM node and requires no explicit `aria-hidden` attribute.
- `<Nav>` uses a `<nav>` landmark. `<main id="content">` wraps all sections. `<footer>` uses `<footer>`.
- **Section IDs:** Each section component's outermost `<section>` tag must have an `id` matching its nav anchor. Required IDs: `id="experience"`, `id="projects"`, `id="skills"`, `id="contact"`. Without these, the nav anchor links scroll to the top of the page instead of the section.
- Section headings: the hero name is `<h1>`. The contact "Let's talk." is `<h2>`. Other section display text is `<p>` or `<span>` since the `SectionHeader` labels are navigational, not semantic headings.
- External links have `rel="noopener noreferrer"`. This includes hero bottom-row links (LinkedIn, GitHub), contact links, and any future external links.
- Reduced motion is handled globally via `<MotionConfig reducedMotion="user">` in `layout.tsx`. No per-component `useReducedMotion()` checks are needed or permitted.
- **Focus rings:** Defined globally in `globals.css` via `*:focus-visible` — see Section 5.4. No per-component focus styles are needed.
- **Mobile touch targets:** The mobile hamburger button and all contact links must have a minimum computed touch target of 44×44px. If the visual element is smaller, use padding to expand the hit area. The hamburger button uses `p-3` to ensure the 44px minimum.
- **Language:** The `<html>` tag must carry `lang="en"`. Required for screen readers.
- **Mobile menu ARIA:** The hamburger button uses `aria-expanded` and `aria-controls="mobile-menu"`. The mobile menu `<div>` uses `id="mobile-menu"`. This creates an explicit programmatic association between the control and the controlled element.

---

## 14. Responsive Behavior

**Breakpoints (Tailwind defaults):**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

**Mobile (< md) behavior:**
- Horizontal padding reduces from `px-14` to `px-7`.
- Hero grid collapses from 2-column to 1-column.
- Experience items collapse from 3-column to 1-column. Date moves to top (order switch via `order-first md:order-last`).
- Projects grid collapses from 3-column to 1-column.
- Contact collapses from flex-row to flex-column.
- Nav hides links, shows hamburger icon.

**No horizontal scrolling ever.** Every layout must be tested at 375px wide (iPhone SE).

---

## 15. Code Quality Rules

These rules apply to every file in the codebase:

1. **No inline styles** (`style={}`). All values — including fluid font sizes — are expressed as Tailwind classes from the design token config.
2. **No magic numbers.** Any numeric value that appears more than once must be a Tailwind config value or a named constant.
3. **No `any` in TypeScript.** Use `unknown` and narrow, or define a proper interface.
4. **No commented-out code** in the final codebase. Use git history instead.
5. **Imports are organized:** external libraries first, then internal `@/` imports, then relative imports. One blank line between groups.
6. **Component files export one default export.** Named exports are for types/interfaces and utility functions only.
7. **No prop drilling beyond 2 levels.** Section components import data directly. Only truly reusable UI atoms accept props.
8. **All `map()` calls have stable `key` props.** Use content-derived keys (e.g., `company` name), not array index — except in two explicitly documented cases where the array is static and never reorders or mutates: `parseBullet` segments and `nameLines`. In these cases `key={i}` is acceptable and documented. Any new `map()` call over dynamic or reorderable data must use a content-derived key.
9. **Server Components by default.** Only add `'use client'` when genuinely needed (hooks, event handlers, browser APIs). Currently only `Nav.tsx` and `FadeIn.tsx` require it.
10. **No `TODO` comments in production.** All incomplete items are tracked outside the codebase.

---

## 16. Maintenance Guidelines

**Adding a new project:** Add an entry to `src/data/projects.ts`. The `Projects.tsx` component renders from the array — no component changes needed. Limit to 3 projects. If a 4th is added, replace the weakest existing one rather than expanding the grid.

**Updating experience:** Edit `src/data/experience.ts`. No component changes needed.

**Changing a color:** Edit the `@theme` block in `globals.css`. The CSS variable change propagates everywhere automatically.

**Changing a font:** Edit `src/lib/fonts.ts` to change the Google Font. Update the `--font-*` variable name in `globals.css`'s `@theme` block if the variable name changes.

**Updating the site URL** (e.g., when moving from Vercel subdomain to a custom domain): Edit `SITE_URL` in `src/lib/constants.ts`. The change propagates to `sitemap.ts`, `robots.ts`, `metadata`, JSON-LD, and `opengraph-image.tsx` automatically.

**Adding a new section:** Create `src/components/sections/NewSection.tsx`, import data from a new file in `src/data/`, add the component to `page.tsx`. The `FadeIn` wrapper and `SectionHeader` component handle animation and header automatically — just use them.

**Do not** add a CMS unless the site needs to be updated by someone who cannot edit TypeScript.

---

## 17. What This Site Deliberately Does Not Have

The following patterns are explicitly excluded. Do not add them.

- **Hero background image or video.** The typography is the hero.
- **Skill progress bars or percentage meters.** They are not meaningful and look amateurish.
- **Skill icon grids** (rows of language/tool logos). Replaced by clean tabular text.
- **Animated typing effect** on the hero tagline. Overused, distracting, and slow.
- **Dark mode toggle.** The warm paper palette is a design decision, not a light mode default. Dark mode would require a completely different palette and is not worth the implementation cost for a portfolio.
- **Blog section** (unless content already exists). An empty blog with one post signals incomplete follow-through.
- **"Download Resume" button** prominently in the hero. The site is the resume. A link in the nav or contact section is sufficient.
- **Particle effects, Three.js canvas, generative backgrounds.** These are common CS portfolio clichés. The Poisson Disk algorithm demo is reserved for a dedicated project page if one is added later.
- **Testimonials or "what people say" section.** Not appropriate for a student/early-career portfolio.
- **A "Hire Me" CTA button.** The contact section is the CTA.
- **Stagger animations.** Each section animates as a unit. Per-item stagger adds complexity without meaningfully improving the editorial feel.

---

## 18. Quick Start

```bash
# Scaffold the project
npx create-next-app@latest eshan-portfolio \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint    # We configure ESLint manually (see Section 19)

cd eshan-portfolio

# Install dependencies
npm install framer-motion @vercel/analytics @vercel/speed-insights

# Install dev dependencies
npm install -D vitest @vitest/globals

# Download font files for OG image generation
# Place in src/assets/fonts/:
#   DMSerifDisplay-Italic.ttf
#   IBMPlexMono-Regular.ttf
# Download from: https://fonts.google.com

# Generate noise.png (any noise generator tool targeting 200×200px greyscale fractal noise)
# Place in: public/noise.png

# Verify Tailwind v4 is installed (create-next-app may install v3)
# If v3: npm install tailwindcss@latest — see Tailwind v4 migration docs
```

After scaffolding, delete the default `src/app/page.tsx`, `src/app/globals.css`, and `tailwind.config.ts` (if generated) — this spec replaces all of them.

---

## 19. Tooling Configuration

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "react/no-danger": "error"
  }
}
```

`react/no-danger` flags any `dangerouslySetInnerHTML` usage in the codebase. The two legitimate uses (JSON-LD in `layout.tsx`, OG image in `opengraph-image.tsx`) must be annotated with `// eslint-disable-next-line react/no-danger` to acknowledge the intentional exception. This makes every other unsafe innerHTML usage an error — not just a warning.

### `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid"
}
```

### `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['__tests__/**/*.test.ts'],
  },
})
```

### `package.json` — key scripts and dependencies

```json
{
  "scripts": {
    "dev":   "next dev",
    "build": "next build",
    "start": "next start",
    "lint":  "next lint",
    "test":  "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next":                  "^16.0.0",
    "react":                 "^19.0.0",
    "react-dom":             "^19.0.0",
    "framer-motion":         "^11.0.0",
    "@vercel/analytics":     "^1.0.0",
    "@vercel/speed-insights": "^1.0.0"
  },
  "devDependencies": {
    "typescript":            "^5.0.0",
    "@types/node":           "^20.0.0",
    "@types/react":          "^19.0.0",
    "@types/react-dom":      "^19.0.0",
    "tailwindcss":           "^4.0.0",
    "eslint":                "^9.0.0",
    "eslint-config-next":    "^16.0.0",
    "prettier":              "^3.0.0",
    "vitest":                "^2.0.0"
  }
}
```

---

## 20. Testing

### `__tests__/parseBullet.test.ts`

`parseBullet` is the only non-trivial pure function in the codebase. It must have a unit test that verifies correct segment output and validates that all `bullets` arrays in `src/data/experience.ts` have properly paired tags.

```typescript
import { parseBullet } from '../src/lib/parseBullet'
import { EXPERIENCE } from '../src/data/experience'

describe('parseBullet', () => {
  it('returns a single plain segment for a string with no tags', () => {
    const result = parseBullet('Built a REST API')
    expect(result).toEqual([{ text: 'Built a REST API', strong: false }])
  })

  it('correctly splits a string with one strong tag', () => {
    const result = parseBullet('Achieved <strong>83% accuracy</strong> using SVMs')
    expect(result).toEqual([
      { text: 'Achieved ',      strong: false },
      { text: '83% accuracy',   strong: true  },
      { text: ' using SVMs',    strong: false },
    ])
  })

  it('handles multiple strong tags in one bullet', () => {
    const result = parseBullet('Yielded <strong>9% CAGR</strong> and <strong>2.1 Sharpe</strong>')
    expect(result).toEqual([
      { text: 'Yielded ',   strong: false },
      { text: '9% CAGR',   strong: true  },
      { text: ' and ',      strong: false },
      { text: '2.1 Sharpe', strong: true  },
      { text: '',           strong: false },
    ].filter(s => s.text.length > 0))
  })

  it('returns no strong segments for a plain string', () => {
    const result = parseBullet('No tags here at all')
    expect(result.every(s => !s.strong)).toBe(true)
  })

  // Data integrity tests — validates that all bullets in experience.ts have paired tags
  describe('data integrity — all experience bullets have paired <strong> tags', () => {
    EXPERIENCE.forEach(item => {
      item.bullets.forEach(bullet => {
        it(`"${bullet.slice(0, 40)}..." — tags are paired`, () => {
          const segments = parseBullet(bullet)
          // If tags are unpaired, the last segment will have strong: true
          const lastSegment = segments[segments.length - 1]
          expect(lastSegment?.strong).toBe(false)
        })
      })
    })
  })
})
```

Run tests with `npm test`. All tests must pass before any deployment.
