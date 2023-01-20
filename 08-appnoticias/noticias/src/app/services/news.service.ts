import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, ResponseTopHeadLine } from '../interfaces';
import { map } from "rxjs/operators";
import { ArticlesCategory } from '../interfaces/index';
import { storedArticlesByCategory } from '../data/mock-news';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public articlesByCategoryPage: ArticlesCategory = storedArticlesByCategory;

  constructor(private http: HttpClient) { }


  private executeQuery<T>(endpoint: string) {
    console.log("PETICION HTTP");
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey: apiKey,
        country: 'us'
      }
    });
  }

  public getTopHeadLines(): Observable<Article[]> {
    return this.getTopHeadLinesByCategory('business');
  }


  public getTopHeadLinesByCategory(category: string, loadMore: boolean = false): Observable<Article[]> {

    return of(this.articlesByCategoryPage[category].articles);
    
    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this.articlesByCategoryPage[category]) {
      return of(this.articlesByCategoryPage[category].articles);
    }

    return this.getArticlesByCategory(category);
  }


  private getArticlesByCategory(category: string): Observable<Article[]> {
    if (Object.keys(this.articlesByCategoryPage).includes(category)) {

    } else {
      this.articlesByCategoryPage[category] = {
        page: 0,
        articles: []
      };
    }
    const page = this.articlesByCategoryPage[category].page + 1;

    return this.executeQuery<ResponseTopHeadLine>(`/top-headlines?category=${category}&page=${page}`)
      .pipe(
        map(({ articles }) => {

          if (articles.length === 0) return this.articlesByCategoryPage[category].articles;

          this.articlesByCategoryPage[category] = {
            page: page,
            articles: [...this.articlesByCategoryPage[category].articles, ...articles]
          };

          return this.articlesByCategoryPage[category].articles;

        }));
  }

}
