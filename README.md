# Eshan Khan Portfolio (v2)

Next.js 16 + TypeScript + Tailwind CSS v4 portfolio site focused on strong typography, static data, and production-grade fundamentals (SEO, CSP, structured data, testing, and deployment readiness).

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)
- Framer Motion
- Vitest
- Vercel Analytics + Speed Insights

## Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3) Run quality checks

```bash
npm run verify
```

`verify` runs lint + tests + production build.

## Scripts

- `npm run dev`: start local dev server
- `npm run build`: production build
- `npm run start`: run production server
- `npm run lint`: run ESLint
- `npm run test`: run Vitest once
- `npm run test:watch`: run Vitest in watch mode
- `npm run verify`: run lint + test + build

## Project Structure

```text
src/
	app/
		layout.tsx
		page.tsx
		globals.css
		error.tsx
		not-found.tsx
		sitemap.ts
		robots.ts
		opengraph-image.tsx
	components/
		layout/
		sections/
		ui/
	data/
		experience.ts
		projects.ts
		skills.ts
	lib/
		constants.ts
		fonts.ts
		parseBullet.ts
	types/
		index.ts
```

## Content Updates

- Experience: edit `src/data/experience.ts`
- Projects: edit `src/data/projects.ts`
- Skills: edit `src/data/skills.ts`
- Shared site identity links and metadata values: edit `src/lib/constants.ts`

## Design Tokens

Design tokens live in `src/app/globals.css` inside the `@theme` block (colors, typography, spacing, and animation timing). Prefer token utilities over introducing hardcoded values in components.

## Assets

- `public/noise.png`: grain texture overlay
- `public/resume.pdf`: resume link target
- `src/assets/fonts/`: local TTF files used for OG image generation

## Deployment

Deploy on Vercel from `main`. Before deploying, run:

```bash
npm run verify
```