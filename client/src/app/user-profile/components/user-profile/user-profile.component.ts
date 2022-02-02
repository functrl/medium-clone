import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppStateInterface} from '../../../shared/types/app-state.interface';
import {ProfileInterface} from '../../../shared/types/profile.interface';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {errorSelector, isLoadingSelector, userProfileSelector} from '../../store/selectors';
import {getUserProfileAction} from '../../store/actions/get-user-profile.action';
import {currentUserSelector} from '../../../auth/store/selectors';
import {filter, map} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/current-user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: ProfileInterface
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  userProfileSubscription: Subscription
  slug: string
  apiUrl: string
  isCurrentUserProfile$: Observable<boolean>

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }
  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe()
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(
      map(([currentUser, userProfile]: [CurrentUserInterface, ProfileInterface]) => {
        return currentUser.username === userProfile.username
      })
    )
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store.pipe(
      select(userProfileSelector)
    ).subscribe((userProfile: ProfileInterface) => {
      this.userProfile = userProfile
    })

    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug
      this.fetchUserProfile()
    })
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({slug: this.slug}))
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites')
    return (this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`)
  }
}
