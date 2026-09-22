import { Article } from '../types';

/**
 * Get manual rank (1-10) for an article if explicitly assigned.
 * Returns null if the article is on auto ranking, excluded, or draft.
 */
export const getManualArticleRank = (article: Article): number | null => {
  if (article.status === 'draft') return null;
  if (article.isTopRanking === false || article.topRankOrder === -1) return null;

  if (typeof article.topRankOrder === 'number' && article.topRankOrder >= 1 && article.topRankOrder <= 10) {
    return article.topRankOrder;
  }
  if (typeof article.isTopRanking === 'number' && article.isTopRanking >= 1 && article.isTopRanking <= 10) {
    return article.isTopRanking;
  }
  if (article.isTopRanking === true) {
    return 1;
  }
  return null;
};

/**
 * Check if an article is excluded from rankings or is draft.
 */
export const isArticleExcludedFromTop = (article: Article): boolean => {
  if (article.status === 'draft') return true;
  return article.isTopRanking === false || article.topRankOrder === -1;
};

/**
 * Computes the top 10 articles strictly ensuring NO two articles share the same rank.
 * 
 * Rules:
 * 1. Only published & non-excluded articles are eligible.
 * 2. Slot 1..10 are reserved for manual rankings (Top 1..10).
 * 3. If multiple articles have the same manual rank (legacy data), only the first one gets the slot; others fallback to auto.
 * 4. Empty slots are filled sequentially with remaining auto articles sorted by views (highest views first).
 * 5. Returns array of top articles in strict rank order (index 0 is Top 1, index 1 is Top 2, ...).
 */
export const computeTop10Articles = (articles: Article[]): Article[] => {
  const published = articles.filter((a) => a.status === 'published' && !isArticleExcludedFromTop(a));
  if (published.length === 0) return [];

  const slots: (Article | null)[] = new Array(10).fill(null);
  const usedIds = new Set<string>();

  // 1. Place manual rank articles into their respective slots (1..10)
  for (const art of published) {
    const manualRank = getManualArticleRank(art);
    if (manualRank !== null && manualRank >= 1 && manualRank <= 10) {
      const slotIdx = manualRank - 1;
      if (slots[slotIdx] === null) {
        slots[slotIdx] = art;
        usedIds.add(art.id);
      }
    }
  }

  // 2. Prepare remaining auto articles sorted by views descending
  const autoArticles = published
    .filter((art) => !usedIds.has(art.id))
    .sort((a, b) => (b.views || 0) - (a.views || 0));

  let autoIdx = 0;

  // 3. Fill empty slots with auto articles
  for (let i = 0; i < 10; i++) {
    if (slots[i] === null && autoIdx < autoArticles.length) {
      slots[i] = autoArticles[autoIdx];
      usedIds.add(autoArticles[autoIdx].id);
      autoIdx++;
    }
  }

  // 4. Return non-null slots
  return slots.filter((item): item is Article => item !== null);
};

export interface ResolvedArticleRank {
  rank: number;
  isManual: boolean;
  isTop10: boolean;
  isExcluded: boolean;
}

/**
 * Computes the resolved rank for EVERY article (both Top 10 and beyond),
 * accurately reflecting how it appears on the user-facing pages.
 */
export const getArticleResolvedRankMap = (articles: Article[]): Map<string, ResolvedArticleRank> => {
  const map = new Map<string, ResolvedArticleRank>();

  const published = articles.filter((a) => a.status === 'published');
  const top10 = computeTop10Articles(published);
  const placedIds = new Set<string>();

  top10.forEach((art, idx) => {
    const manual = getManualArticleRank(art);
    map.set(art.id, {
      rank: idx + 1,
      isManual: manual !== null,
      isTop10: true,
      isExcluded: false
    });
    placedIds.add(art.id);
  });

  // For remaining published articles (rank 11+)
  const remainingPublished = published
    .filter((art) => !placedIds.has(art.id) && !isArticleExcludedFromTop(art))
    .sort((a, b) => (b.views || 0) - (a.views || 0));

  let nextRank = top10.length + 1;
  remainingPublished.forEach((art) => {
    map.set(art.id, {
      rank: nextRank++,
      isManual: false,
      isTop10: false,
      isExcluded: false
    });
  });

  // For excluded or draft articles
  articles.forEach((art) => {
    if (art.status === 'draft' || isArticleExcludedFromTop(art)) {
      map.set(art.id, {
        rank: -1,
        isManual: false,
        isTop10: false,
        isExcluded: true
      });
    }
  });

  return map;
};

/**
 * Ensures a collection of articles has strictly unique manual ranks (1..10).
 * If duplicate manual ranks exist, only the first occurrence retains the rank;
 * others are reset to default (null / undefined).
 */
export const sanitizeArticleRanks = (articles: Article[]): Article[] => {
  const seenRanks = new Set<number>();
  let hasChanges = false;

  const sanitized = articles.map((art) => {
    const manualRank = getManualArticleRank(art);
    if (manualRank !== null) {
      if (seenRanks.has(manualRank)) {
        hasChanges = true;
        return {
          ...art,
          isTopRanking: undefined,
          topRankOrder: null
        };
      }
      seenRanks.add(manualRank);
    }
    return art;
  });

  return hasChanges ? sanitized : articles;
};

