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
    switch (type) {
      case 'cardStatus':
        return formatCardStatusTitle(item)

      default:
        return ''
    }
  }
}
