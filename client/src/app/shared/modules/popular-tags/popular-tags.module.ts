import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PopularTagsComponent} from './components/popular-tags/popular-tags.component'
import {PopularTagsService} from './services/popular-tags.service'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {GetPopularTagsEffect} from './store/effects/get-popular-tags.effect'
import {RouterModule} from '@angular/router'
import {LoadingModule} from '../loading/loading.module'
import {ErrorMessageModule} from '../error-message/error-message.module'

@NgModule({
  declarations: [PopularTagsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    RouterModule,
    LoadingModule,
    ErrorMessageModule,
  ],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService],
})
export class PopularTagsModule {}
