import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {ArticleInterface} from '../../../types/article.interface';
import {HttpClient} from '@angular/common/http';
import {GetArticleResponseInterface} from '../../../types/get-article-response.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class AddToFavoritesService {

  constructor(private http: HttpClient) { }

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug)
    return this.http.post(url, {}).pipe(
      map((response: GetArticleResponseInterface): ArticleInterface => response.article)
    )
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug)
    return this.http.delete(url).pipe(
      map((response: GetArticleResponseInterface): ArticleInterface => response.article)
    )
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`
  }
}
