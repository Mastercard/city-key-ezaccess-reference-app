import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class ProgramsListService {
  constructor(private _http: HttpClient) { }

  getPrograms(params?: any): Observable<unknown> {
    return this._http.get('/programs', { params })
  }
}
