import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

import { SearchActionHeaderComponent } from './search-action-header.component'

@NgModule({
  declarations: [SearchActionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [SearchActionHeaderComponent]
})
export class SearchActionHeaderModule { }
