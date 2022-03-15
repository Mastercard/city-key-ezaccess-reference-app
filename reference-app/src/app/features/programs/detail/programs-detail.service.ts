import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class ProgramsDetailService {
  constructor(private _http: HttpClient) { }

  getCards(programId: string, params: any = {}): Observable<unknown> {
    return this._http.get('/cards', {
      params: { programId, ...params }
    })
  }

  unassignCard(programId: string, cardEaid: string): Observable<unknown> {
    return this._http.delete(`/programs/${programId}/cards/${cardEaid}`)
  }
}
