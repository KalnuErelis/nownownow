# TESTS GUIDE

## OVERVIEW
This directory is a focused Playwright harness, not a general test suite. The main contract is `/about` plus one homepage smoke check for shared-selector regressions.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Runner config | `../playwright.config.ts` | Chromium-only, custom snapshot path, local web server |
| Main spec | `about.spec.ts` | Structure, Axe, overflow, homepage smoke, snapshots |
| Visual baselines | `__screenshots__/about.spec.ts/chromium/` | Approved mobile/tablet/desktop screenshots |

## CONVENTIONS
- Mock remote assets before navigating to `/about`; the spec stubs GitHub avatar and activity chart URLs.
- Keep visual baselines in the configured `tests/__screenshots__/...` path.
- `/about` is the main verification surface; homepage coverage lives here only as a smoke guard for shared selectors.
- Use the existing viewport set for overflow and snapshots unless the contract intentionally changes.

## ANTI-PATTERNS
- Do not broaden this into a generic multi-route E2E suite without an explicit decision.
- Do not approve screenshots before structural, accessibility, and overflow assertions are passing.
- Do not rely on live network responses for the mocked remote assets.
- Do not remove the homepage smoke check when shared CSS selector paths are touched.

## COMMANDS
```bash
npm run test:about
npm run test:about -- --update-snapshots
```

## NOTES
- Snapshot updates are expected when layout or shared visual output intentionally changes.
- `playwright.config.ts` starts the Astro dev server automatically and reuses it outside CI.
