import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {AuthModule} from './auth/auth.module'
import {StoreModule} from '@ngrx/store'
import {environment} from '../../../../cooking-recipes/client/src/environments/environment'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {EffectsModule} from '@ngrx/effects'
import {TopBarModule} from './shared/modules/top-bar/top-bar.module'
import {PersistenceService} from './shared/services/persistence.service'
import {AuthInterceptor} from './shared/services/auth.interceptor'
import {GlobalFeedModule} from './global-feed/global-feed.module'
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store'
import {YourFeedModule} from './your-feed/your-feed.module'
import {TagFeedModule} from './tag-feed/tag-feed.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({router: routerReducer}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    StoreRouterConnectingModule.forRoot(),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
