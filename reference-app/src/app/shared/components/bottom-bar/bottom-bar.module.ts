import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'app/shared/modules/shared.module'

import { BottomBarComponent } from './bottom-bar.component'

@NgModule({
  declarations: [BottomBarComponent],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [BottomBarComponent]
})
export class BottomBarModule { }
