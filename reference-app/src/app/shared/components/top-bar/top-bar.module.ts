import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatRippleModule } from '@angular/material/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'

import { SharedModule } from 'app/shared/modules/shared.module'

import { TopBarComponent } from './top-bar.component'

@NgModule({
  declarations: [TopBarComponent],
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatRippleModule,
    SharedModule
  ],
  exports: [TopBarComponent]
})
export class TopBarModule { }
