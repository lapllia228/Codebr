import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {Observable, take} from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { ArticleSearchResult } from '../../core/models/article.model';
import { HighlightPipe } from '../../shared/pipes/highlight.pipe';
import * as ArticlesActions from '../../core/store/articles.actions';
import * as ArticlesSelectors from '../../core/store/articles.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HighlightPipe
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles$: Observable<ArticleSearchResult[]>;
  loading$: Observable<boolean>;
  searchKeyword$: Observable<string>;
  searchControl = new FormControl('');

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.articles$ = this.store.select(ArticlesSelectors.selectFilteredArticles);
    this.loading$ = this.store.select(ArticlesSelectors.selectLoading);
    this.searchKeyword$ = this.store.select(ArticlesSelectors.selectSearchKeyword);
  }

  ngOnInit(): void {
    this.store.select(ArticlesSelectors.selectAllArticles)
      .pipe(take(1))
      .subscribe(articles => {
        if (articles.length === 0) {
          this.store.dispatch(ArticlesActions.loadArticles());
        }
      });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(keyword => {
        this.store.dispatch(ArticlesActions.setSearchKeyword({ keyword: keyword || '' }));
      });
  }

  truncateText(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  navigateToArticle(id: number): void {
    this.router.navigate(['/article', id]);
  }
}
