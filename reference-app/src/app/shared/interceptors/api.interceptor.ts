import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const props: any = {
      url: `${environment.apiUrl}${request.url}`,
      setHeaders: {
        Accept: 'application/json'
      }
    }

    if (!(request.body instanceof FormData)) {
      props.setHeaders['Content-Type'] = 'application/json'
    }

    return next.handle(request.clone(props))
  }
}
