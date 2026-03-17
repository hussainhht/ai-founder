# AI Founder

AI Founder is a frontend-only AI tools discovery platform.

Current phase:

- Simple homepage UI only
- Next.js + TypeScript + Tailwind CSS
- Static sample data in the homepage file
- No backend, no database, no authentication

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Current Homepage Includes

- Navbar (Home, Tools, Categories, Compare)
- Hero section with search UI
- Featured categories cards
- Featured tools cards
- Footer

## Project Structure

```txt
ai-founder/
├─ src/
│  └─ app/
│     ├─ globals.css
│     ├─ layout.tsx
│     └─ page.tsx
├─ ai-data.json
├─ ai-founder-tools-catalog.json
├─ deep-research-report.md
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.ts
├─ tsconfig.json
└─ README.md
```

## Run Locally

```bash
npm install
npm run dev
```

Then open:

- http://localhost:3000
