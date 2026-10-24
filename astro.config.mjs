import { copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// `@astrojs/sitemap` emits `sitemap-index.xml` plus `sitemap-0.xml`.
// Crawlers that request the conventional `/sitemap.xml` path get the same index.
function sitemapXmlAlias() {
  return {
    name: "sitemap-xml-alias",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const destDir = fileURLToPath(dir);
        await copyFile(path.join(destDir, "sitemap-index.xml"), path.join(destDir, "sitemap.xml"));
        logger.info("Created sitemap.xml as a copy of sitemap-index.xml");
      }
    }
  };
}

export default defineConfig({
  site: "https://kadunas.com",
  integrations: [sitemap(), sitemapXmlAlias()],
  output: "static"
});
