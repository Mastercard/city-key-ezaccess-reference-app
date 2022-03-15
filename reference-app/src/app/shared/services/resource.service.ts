import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpExService } from 'ngx-mclabs-utils'

@Injectable({ providedIn: 'root' })
export class ResourceService {
  constructor(private _httpEx: HttpExService) { }

  getProgramsRes(): Observable<unknown> {
    return this._httpEx.concat({
      method: 'get',
      url: '/programs',
      useOffsetOrPage: 'offset',
      pageSizeParam: 'limit',
      offsetParam: 'offset',
      totalElementsKey: 'total',
      itemsKey: 'items'
    })
  }
}
