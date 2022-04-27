import { Pipe, PipeTransform } from '@angular/core'

import {
  formatCardStatusTitle
} from 'app/shared/utils'

@Pipe({
  name: 'formatTitle'
})
export class FormatTitlePipe implements PipeTransform {
  transform(
    item: any,
    type?: 'cardStatus'
  ): string {
    if(type==='cardStatus') {
        return formatCardStatusTitle(item)
    } else {
      return ''
    }
  }
}
