# DATA GUIDE

## OVERVIEW
`src/data` is the repo’s content/control layer. Authored site configuration lives beside generated article content, and both feed multiple routes.

## STRUCTURE
- `site.ts` — authored site identity, nav, page metadata, and page content objects
- `articles.generated.ts` — generated article payloads from the import script
- `articles.ts` — thin adapter that adds route-ready post hrefs and exports the article type

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Site identity / nav / page copy | `site.ts` | Main source of truth for authored content |
| Generated article source | `articles.generated.ts` | Produced by import script |
| Article adapter | `articles.ts` | Adds routed `href` values and exported type |
| Import pipeline | `../../scripts/import_substack_export.py` | Writes `articles.generated.ts` |

## CONVENTIONS
- `site.ts` uses uppercase exported objects for major content domains: `SITE`, `NOW_PAGE`, `ABOUT_PAGE`, `SEARCH_PAGE`, `AGENTS_PAGE`.
- Keep authored page chrome, metadata, and structured copy in `site.ts` when a page already follows that pattern.
- `articles.ts` is the stable adapter layer; page code should prefer it over reaching straight into generated data.
- Post hrefs normalize to `/posts/<slug>/` here, not in route templates.

## ANTI-PATTERNS
- Do not hand-edit `articles.generated.ts`.
- Do not change the article object shape without checking home (`pages/index.astro`), search (`pages/search.astro`), and post routing (`pages/posts/[slug].astro`).
- Do not move already-centralized page labels/copy back into Astro templates.
- Do not run the import pipeline casually without checking the input path and generated diff.

## NOTES
- The Python importer sanitizes Substack HTML, strips unsupported nodes, generates excerpts, and computes reading time.
- This directory is the clearest non-standard boundary in the repo; when in doubt, inspect data flow here before changing routes.
