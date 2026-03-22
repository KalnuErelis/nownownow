import { articles } from "./articles.generated";

const normalizeArticleText = (value: string) => value.replace(/\s+/g, " ").trim();

const truncateDescription = (value: string, maxLength = 165) => {
  if (value.length <= maxLength) {
    return value;
  }

  const truncated = value.slice(0, maxLength).trimEnd();
  const safeBreak = truncated.lastIndexOf(" ");
  const shortened = safeBreak > 72 ? truncated.slice(0, safeBreak) : truncated;

  return `${shortened.replace(/[.,;:!?-]+$/, "")}...`;
};

const scoreDescriptionCandidate = (value: string) => {
  let score = Math.min(value.length, 170);

  if (value.length >= 80) score += 30;
  if (value.length >= 110 && value.length <= 180) score += 20;
  if (/(?:\.\.\.|…)$/.test(value)) score -= 15;

  return score;
};

export const getArticleSeoDescription = (article: (typeof articles)[number]) => {
  const candidates = [article.description, article.excerpt, article.subtitle]
    .map(normalizeArticleText)
    .filter(Boolean)
    .filter((candidate, index, values) => {
      const normalizedCandidate = candidate.toLowerCase();
      return values.findIndex((value) => value.toLowerCase() === normalizedCandidate) === index;
    });

  const bestCandidate = candidates.reduce<string | undefined>((best, candidate) => {
    if (!best) {
      return candidate;
    }

    return scoreDescriptionCandidate(candidate) > scoreDescriptionCandidate(best) ? candidate : best;
  }, undefined);

  return truncateDescription(bestCandidate ?? "");
};

export const importedArticles = [...articles]
  .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
  .map((article) => ({
    ...article,
    href: `/posts/${article.slug}/`,
    seoDescription: getArticleSeoDescription(article)
  }));

export type ImportedArticle = (typeof importedArticles)[number];

export const getMoreWriting = (currentSlug: string, limit = 3) =>
  importedArticles.filter((article) => article.slug !== currentSlug).slice(0, limit);
