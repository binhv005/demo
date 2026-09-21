export type ProductType = 'physical' | 'digital';

export interface ScoreBreakdown {
  design: number;
  performance: number;
  value: number;
  usability: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  category: string;
  categorySlug: string;
  groupSlug: string; // e.g. 'gia-dung', 'dien-tu', 'ai', 'phan-mem'
  brand: string;
  image: string;
  gallery?: string[];
  score: number;
  ratingCount: number;
  price: number;
  originalPrice?: number;
  priceUnit?: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  shortDescription: string;
  deepReview: string;
  specs: Record<string, string>;
  scoreBreakdown: ScoreBreakdown;
  badge?: string;
  buyUrl?: string;
  status: 'published' | 'draft' | 'archived';
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  group: ProductType;
  groupSlug: string;
  icon: string;
  description: string;
  count: number;
  subcategories: Subcategory[];
  featuredRankingSlug?: string;
  status?: 'active' | 'inactive';
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  articlesCount: number;
  experienceYears: number;
  credentials: string[];
}

export interface RankingItemDetail {
  rank: number;
  productId: string;
  highlight: string;
  verdict: string;
  customPros?: string[];
  customCons?: string[];
}

export interface Ranking {
  id: string;
  title: string;
  slug: string;
  type: ProductType;
  groupSlug: string;
  categorySlug: string;
  image?: string;
  subtitle: string;
  updatedAt: string;
  authorId: string;
  intro: string;
  methodology: string;
  quickPicks: {
    bestOverallId: string;
    bestValueId: string;
    bestPremiumId: string;
  };
  items: RankingItemDetail[];
  conclusion: string;
  faq: { q: string; a: string }[];
  status: 'published' | 'draft';
}

export interface ComparisonFeature {
  feature: string;
  productA: string;
  productB: string;
  winner: 'A' | 'B' | 'Tie';
}

export interface Comparison {
  id: string;
  title: string;
  slug: string;
  type: ProductType;
  categorySlug: string;
  productAId: string;
  productBId: string;
  winnerId: string;
  image?: string;
  verdict: string;
  priceComparison: string;
  features: ComparisonFeature[];
  experienceComparison: string;
  finalRecommendation: string;
  authorId: string;
  updatedAt: string;
  faq: { q: string; a: string }[];
  status: 'published' | 'draft';
  isFeatured?: boolean;
}

export interface TOCItem {
  id: string;
  title: string;
}

export interface ArticleBlock {
  id?: string;
  type: 'heading' | 'paragraph' | 'image' | 'quote' | 'callout' | 'list' | 'table' | 'video' | 'divider' | 'code' | 'columns';
  text?: string;
  url?: string;
  caption?: string;
  width?: string;
  height?: string;
  maxHeight?: string;
  code?: string;
  language?: string;
  author?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: string;
  bgColor?: string;
  highlightColor?: string;
  fontSize?: string;
  lineHeight?: string;
  level?: 1 | 2 | 3 | 4;
  calloutType?: 'tip' | 'note' | 'warning' | 'success';
  headers?: string[];
  rows?: string[][];
  items?: string[];
  listType?: 'bullet' | 'numbered';
  // Multi-column block fields
  layout?: '50-50' | '60-40' | '40-60' | '70-30' | '30-70';
  leftType?: 'text' | 'image' | 'video';
  leftTitle?: string;
  leftText?: string;
  leftImageUrl?: string;
  leftImageCaption?: string;
  leftImageHeight?: string;
  leftVideoUrl?: string;
  rightType?: 'text' | 'image' | 'video';
  rightTitle?: string;
  rightText?: string;
  rightImageUrl?: string;
  rightImageCaption?: string;
  rightImageHeight?: string;
  rightVideoUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  type: 'review' | 'guide' | 'comparison' | 'news';
  productType: ProductType;
  categorySlug: string;
  coverImage: string;
  excerpt: string;
  content: string;
  blocks?: ArticleBlock[];
  tableOfContents?: TOCItem[];
  authorId: string;
  readingTime: string;
  publishedAt: string;
  relatedProductIds?: string[];
  tags: string[];
  views: number;
  status: 'published' | 'draft';
  isFeatured?: boolean;
  isTopRanking?: boolean | number;
  topRankOrder?: number | null;
}

export interface AdminStats {
  productsCount: number;
  categoriesCount: number;
  rankingsCount: number;
  reviewsCount: number;
  draftsCount: number;
  totalViews: number;
  monthlyGrowth: number;
}
