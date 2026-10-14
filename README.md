# Eshan Khan Portfolio

Next.js 16, TypeScript, and CSS portfolio.

## Development

```bash
npm install
npm run dev
```

Install the browser once with `npx playwright install chromium`, then run
`npm run verify` before deployment. Verification runs lint, the production build,
and a browser smoke test. `npm test` runs the smoke test against the existing build
and starts its own local server on port 3100.

## Content

- Experience: `src/data/experience.ts`
- Projects: `src/data/projects.ts`
- Contact and metadata: `src/lib/constants.ts`
