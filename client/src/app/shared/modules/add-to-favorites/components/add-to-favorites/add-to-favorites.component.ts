import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStateInterface} from '../../../../types/app-state.interface';
import {addToFavoritesAction} from '../../store/actions/add-to-favorites.action';

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss']
})
export class AddToFavoritesComponent implements OnInit {
  @Input() isFavorited: boolean
  @Input() favoritesCount: number
  @Input() articleSlug: string

  count: number
  favorited: boolean

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.count = this.favoritesCount
    this.favorited = this.isFavorited
  }

  handleLike() {
    this.store.dispatch(addToFavoritesAction({
      isFavorited: this.favorited,
      slug: this.articleSlug
    }))
    if (this.favorited) {
      this.count = this.count - 1
    } else {
      this.count = this.count + 1
    }
    this.favorited = !this.favorited
  }
}
