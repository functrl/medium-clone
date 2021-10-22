import {Actions, createEffect, ofType} from '@ngrx/effects'
import {CreateArticleService} from '../../services/create-article.service'
import {Router} from '@angular/router'
import {Injectable} from '@angular/core'
import {catchError, map, switchMap, tap} from 'rxjs/operators'
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from '../actions/create-article.action'
import {ArticleInterface} from '../../../shared/types/article.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {of} from 'rxjs'

@Injectable()
export class CreateArticleEffect {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({articleInput}) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: ArticleInterface) => {
            return createArticleSuccessAction({article})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  )

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({article}) => {
          this.router.navigate(['/articles', article.slug])
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}
}
