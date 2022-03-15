import { NgModule } from '@angular/core'

import { ResourceSelectDirective } from './resource-select/resource-select.directive'

@NgModule({
  declarations: [
    ResourceSelectDirective
  ],
  exports: [
    ResourceSelectDirective
  ]
})
export class DirectivesModule { }
