export interface Article {
  id: number;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  news_site: string;
  published_at: string;
}

export interface ArticleSearchResult extends Article {
  relevanceScore: number;
  titleMatches: number;
  descriptionMatches: number;
}
