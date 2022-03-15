import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'

import { SharedModule } from 'app/shared/modules/shared.module'

import { NotySnackbarComponent } from './noty-snackbar.component'

@NgModule({
  declarations: [NotySnackbarComponent],
  imports: [
    MatIconModule,
    SharedModule
  ],
  exports: [NotySnackbarComponent]
})
export class NotySnackbarModule { }
