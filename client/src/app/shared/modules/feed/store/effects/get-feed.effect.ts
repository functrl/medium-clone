import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {FeedService} from '../../services/feed.service';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from '../actions/get-feed.action';

@Injectable()

export class GetFeedEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({url}) => {
        return this.feedService.getFeed(url).pipe(
          map((feed) => {
            return getFeedSuccessAction({feed})
          }),
          catchError(() => {
            return of(getFeedFailureAction())
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private feedService: FeedService
  ) {
  }
}
