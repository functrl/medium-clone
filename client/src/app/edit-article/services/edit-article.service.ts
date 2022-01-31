import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {ArticleInterface} from '../../shared/types/article.interface'
import {ArticleInputInterface} from '../../shared/types/article-input.interface'
import {environment} from '../../../environments/environment'
import {SaveArticleResponseInterface} from '../../shared/types/save-article-response.interface'
import {map} from 'rxjs/operators'

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string,
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`

    return this.http
      .put<SaveArticleResponseInterface>(fullUrl, articleInput)
      .pipe(
        map((response: SaveArticleResponseInterface) => {
          return response.article
        })
      )
  }
}
