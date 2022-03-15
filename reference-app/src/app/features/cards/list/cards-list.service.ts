import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class CardsListService {
  constructor(private _http: HttpClient) { }

  getCards(params?: any): Observable<unknown> {
    return this._http.get('/cards', { params })
  }

  changeCardStatus(cardEaid: string, body: unknown): Observable<unknown> {
    return this._http.put(`/cards/${cardEaid}`, body)
  }

  replaceCardEaid(cardEaid: string, body: unknown): Observable<unknown> {
    return this._http.post(`/cards/${cardEaid}`, body)
  }

  assignProgram(programId: string, body: unknown): Observable<unknown> {
    return this._http.put(`/programs/${programId}/cards`, body)
  }

  unassignProgram(programId: string, cardEaid: string): Observable<unknown> {
    return this._http.delete(`/programs/${programId}/cards/${cardEaid}`)
  }
}
