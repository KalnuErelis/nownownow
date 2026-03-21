# kadunas.com

Personal site for Jaunius Kadunas, rebuilt in Astro and deployed to GitHub Pages.

## Stack

- Astro for pages and static generation
- Plain CSS for layout and theme styling
- GitHub Actions for build and Pages deployment

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production output is generated into `dist/`.

## Publish Model

GitHub Actions builds the site from `dist/` and deploys it to Pages. The legacy Python builder and root-level generated HTML have been removed.

## Content

The site content now lives in [`src/data/site.ts`](./src/data/site.ts).
