import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'validationMsg'
})
export class ValidationMsgPipe implements PipeTransform {
  transform(
    field: string,
    type?:
    'required' | 'invalid' | 'alphanumeric' | 'password' |
    'min' | 'max' | 'minlength' | 'maxlength' | 'length' |
    'number' | 'equalTo',
    crossField?: unknown
  ): string {
    switch (type) {
      case 'required':
        return `${field} is required`

      case 'invalid':
        return `${field} is invalid`

      case 'alphanumeric':
        return `${field} should only contain alphanumeric characters`

      case 'min':
        return `${field} should not be smaller than ${crossField}`

      case 'max':
        return `${field} should not be greater than ${crossField}`

      case 'minlength':
        return `${field} should not be shorter than ${crossField} characters`

      case 'maxlength':
        return `${field} should not be longer than ${crossField} characters`

      case 'length':
        return `${field} should have ${crossField} characters`

      case 'number':
        return `${field} should be a number`

      case 'equalTo':
        return `${field} and ${crossField} is mismatched`

      default:
        return ''
    }
  }
}
