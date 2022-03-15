import { TestBed } from '@angular/core/testing'
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { environment } from 'src/environments/environment'

import { ApiInterceptor } from './api.interceptor'

describe(ApiInterceptor.name, () => {
  const { apiUrl } = environment

  const path = '/cards'

  const imports = [HttpClientTestingModule]

  let providers: unknown[]

  let http: HttpClient
  let httpController: HttpTestingController

  beforeEach(() => {
    providers = [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiInterceptor,
        multi: true
      }
    ]

    TestBed.configureTestingModule({ imports, providers })

    http = TestBed.inject(HttpClient)
    httpController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpController.verify()
  })

  it('should set request headers', () => {
    http.post(path, {}).subscribe()
    const { headers } = httpController.expectOne(`${apiUrl}${path}`).request

    expect(headers.get('Accept')).toEqual('application/json')
    expect(headers.get('Content-Type')).toEqual('application/json')
  })

  it('should not set Content-Type header for form data request', () => {
    http.post(path, new FormData()).subscribe()
    const { headers } = httpController.expectOne(`${apiUrl}${path}`).request

    expect(headers.get('Content-Type')).toBeNull()
  })
})
