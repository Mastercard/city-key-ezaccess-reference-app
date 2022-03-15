import { NgModule, PLATFORM_ID } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { Actions, EffectsModule } from '@ngrx/effects'
import { BrowserWindowRef, EffectFactory, HttpExService, WINDOW, windowFactory, WindowRef } from 'ngx-mclabs-utils'

import { environment } from 'src/environments/environment'
import { ApiInterceptor } from 'app/shared/interceptors/api.interceptor'
import reducers from 'app/shared/ngrx/reducers'
import effects from 'app/shared/ngrx/effects'
import { NotySnackbarModule } from 'app/shared/components/noty-snackbar/noty-snackbar.module'
import { TopBarModule } from 'app/shared/components/top-bar/top-bar.module'
import { BottomBarModule } from 'app/shared/components/bottom-bar/bottom-bar.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      name: 'Angular Starter MCLabs',
      logOnly: environment.production
    }),
    MatSnackBarModule,
    AppRoutingModule,
    NotySnackbarModule,
    TopBarModule,
    BottomBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        horizontalPosition: 'end'
      }
    },
    {
      provide: HttpExService,
      deps: [HttpClient]
    },
    {
      provide: EffectFactory,
      deps: [Actions]
    },
    {
      provide: WindowRef,
      useClass: BrowserWindowRef
    },
    {
      provide: WINDOW,
      useFactory: windowFactory,
      deps: [WindowRef, PLATFORM_ID]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
