import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PipesModule } from 'app/shared/pipes/pipes.module'
import { DirectivesModule } from 'app/shared/directives/directives.module'

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    CommonModule,
    PipesModule,
    DirectivesModule
  ]
})
export class SharedModule { }
