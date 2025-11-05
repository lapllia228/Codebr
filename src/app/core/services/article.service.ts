import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Article} from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'https://api.spaceflightnewsapi.net/v4/articles';

  constructor(private http: HttpClient) {}

  getArticles(limit: number = 100): Observable<Article[]> {
    return this.http.get<{ results: Article[] }>(`${this.apiUrl}?limit=${limit}`)
      .pipe(
        map(response => response.results)
      );
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }
}
