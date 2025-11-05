import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ArticleService } from './core/services/article.service';
import * as ArticlesActions from './core/store/articles.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleService.getArticles(100).subscribe(
      articles => {
        this.store.dispatch(ArticlesActions.loadArticlesSuccess({ articles }));
      },
      error => {
        this.store.dispatch(ArticlesActions.loadArticlesFailure({
          error: error.message
        }));
      }
    );
  }
}
