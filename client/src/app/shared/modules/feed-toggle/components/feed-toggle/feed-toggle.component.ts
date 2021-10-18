import {Component, Input, OnInit} from '@angular/core'
import {Observable, pipe} from 'rxjs'
import {select, Store} from '@ngrx/store'
import {isLoggedInSelector} from '../../../../../auth/store/selectors'

@Component({
  selector: 'app-feed-toggle',
  templateUrl: './feed-toggle.component.html',
  styleUrls: ['./feed-toggle.component.scss'],
})
export class FeedToggleComponent implements OnInit {
  @Input() tagName: string | null

  isLoggedIn$: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
  }
}
