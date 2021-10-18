import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {YourFeedComponent} from './components/your-feed/your-feed.component'
import {FeedToggleModule} from '../shared/modules/feed-toggle/feed-toggle.module'
import {FeedModule} from '../shared/modules/feed/feed.module'
import {PopularTagsModule} from '../shared/modules/popular-tags/popular-tags.module'
import {BannerModule} from '../shared/modules/banner/banner.module'
import {RouterModule} from '@angular/router'

const routes = [
  {
    path: 'feed',
    component: YourFeedComponent,
  },
]

@NgModule({
  declarations: [YourFeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedToggleModule,
    FeedModule,
    PopularTagsModule,
    BannerModule,
  ],
})
export class YourFeedModule {}
