import { articles } from "./articles.generated";

export const importedArticles = articles.map((article) => ({
  ...article,
  href: `/posts/${article.slug}/`
}));

export type ImportedArticle = (typeof importedArticles)[number];
