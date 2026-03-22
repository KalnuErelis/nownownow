import rss from "@astrojs/rss";
import { importedArticles } from "@/data/articles";
import { SITE, WRITING } from "@/data/site";

export function GET(context: { site: URL | undefined }) {
  return rss({
    title: WRITING.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: importedArticles.map((article) => ({
      title: article.title,
      description: article.seoDescription,
      link: article.href,
      pubDate: new Date(`${article.publishedAt}T00:00:00Z`)
    }))
  });
}
