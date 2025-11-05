import {Article, ArticleSearchResult} from '../../core/models/article.model';

export class SearchUtil {
  static searchArticles(articles: Article[], keywords: string): ArticleSearchResult[] {
    if (!keywords.trim()) {
      return articles.map(article => ({
        ...article,
        relevanceScore: 0,
        titleMatches: 0,
        descriptionMatches: 0
      }));
    }

    const keywordList = keywords.toLowerCase().split(/\s+/).filter(k => k.length > 0);

    const results = articles.map(article => {
      const titleLower = article.title.toLowerCase();
      const summaryLower = article.summary.toLowerCase();

      let titleMatches = 0;
      let descriptionMatches = 0;

      keywordList.forEach(keyword => {
        const titleOccurrences = (titleLower.match(new RegExp(keyword, 'g')) || []).length;
        const summaryOccurrences = (summaryLower.match(new RegExp(keyword, 'g')) || []).length;

        titleMatches += titleOccurrences;
        descriptionMatches += summaryOccurrences;
      });

      const relevanceScore = titleMatches * 2 + descriptionMatches;

      return {
        ...article,
        relevanceScore,
        titleMatches,
        descriptionMatches
      };
    });

    return results
      .filter(result => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}
