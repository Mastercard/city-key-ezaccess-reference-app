import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class CardsPrepareService {
  constructor(
    private _http: HttpClient
  ) { }

  createEaids(body: unknown): Observable<unknown> {
    return this._http.post('/eaids', body)
  }

  registerCards(body: unknown): Observable<unknown> {
    return this._http.post('/cards', body)
  }
}
