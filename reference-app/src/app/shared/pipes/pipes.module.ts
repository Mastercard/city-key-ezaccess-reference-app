import { NgModule } from '@angular/core'

import { FormatTitlePipe } from './format-title/format-title.pipe'
import { SafePipe } from './safe/safe.pipe'
import { ValidationMsgPipe } from './validation-msg/validation-msg.pipe'

@NgModule({
  declarations: [
    FormatTitlePipe,
    SafePipe,
    ValidationMsgPipe
  ],
  exports: [
    FormatTitlePipe,
    SafePipe,
    ValidationMsgPipe
  ]
})
export class PipesModule { }
