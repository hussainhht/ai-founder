Al founder web site here we can sarch for any ai website and everyrhing apout it and how we can know waht is it and for what ..


it will be in 

json file for data about all things 
js 
html
css
..
..

it no need for back end lang like go for python ..




'''
ai-founder/
├─ public/
│  ├─ logos/
│  │  ├─ chatgpt.png
│  │  ├─ midjourney.png
│  │  └─ perplexity.png
│  ├─ screenshots/
│  │  ├─ chatgpt-1.png
│  │  ├─ chatgpt-2.png
│  │  └─ midjourney-1.png
│  └─ icons/
│
├─ src/
│  ├─ app/
│  │  ├─ page.tsx
│  │  ├─ tools/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/
│  │  │     └─ page.tsx
│  │  ├─ categories/
│  │  │  └─ [category]/
│  │  │     └─ page.tsx
│  │  └─ compare/
│  │     └─ page.tsx
│  │
│  ├─ components/
│  │  ├─ layout/
│  │  ├─ search/
│  │  ├─ filters/
│  │  ├─ tool/
│  │  └─ ui/
│  │
│  ├─ data/
│  │  ├─ tools/
│  │  │  ├─ chatgpt.json
│  │  │  ├─ midjourney.json
│  │  │  ├─ perplexity.json
│  │  │  └─ claude.json
│  │  │
│  │  ├─ categories.json
│  │  ├─ subcategories.json
│  │  ├─ filters.json
│  │  ├─ featured-tools.json
│  │  └─ tool-template.json
│  │
│  ├─ lib/
│  │  ├─ load-tools.ts
│  │  ├─ search-tools.ts
│  │  ├─ filter-tools.ts
│  │  ├─ compare-tools.ts
│  │  └─ utils.ts
│  │
│  ├─ types/
│  │  └─ tool.ts
│  │
│  └─ styles/
│
├─ package.json
├─ tsconfig.json
└─ README.md
'''

```ai-founder/
├─ public/
│  ├─ logos/
│  └─ screenshots/
├─ src/
│  ├─ app/
│  │  ├─ page.tsx
│  │  ├─ tools/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/
│  │  │     └─ page.tsx
│  ├─ components/
│  │  ├─ ToolCard.tsx
│  │  ├─ SearchBar.tsx
│  │  └─ FilterBar.tsx
│  ├─ data/
│  │  ├─ tools/
│  │  │  ├─ chatgpt.json
│  │  │  └─ midjourney.json
│  │  ├─ categories.json
│  │  ├─ filters.json
│  │  └─ tool-template.json
│  ├─ lib/
│  │  ├─ load-tools.ts
│  │  └─ search-tools.ts
│  └─ types/
│     └─ tool.ts
└─ package.json
```

'''
src/data/
├─ tools/
│  ├─ chatgpt.json
│  ├─ claude.json
│  └─ midjourney.json
├─ categories.json
├─ filters.json
├─ featured-tools.json
└─ tool-template.json
'''