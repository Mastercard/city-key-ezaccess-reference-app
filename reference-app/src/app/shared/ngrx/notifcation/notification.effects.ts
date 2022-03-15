import { Injectable } from '@angular/core'
import { Actions, createEffect } from '@ngrx/effects'
import { tap } from 'rxjs/operators'
import { ResultAction } from 'ngx-mclabs-utils'

import { NotificationService } from 'app/shared/services/notification.service'

@Injectable()
export class NotificationEffects {
  constructor(
    private _actions$: Actions,
    private _notificationService: NotificationService
  ) { }

  allActions$ = createEffect(() => this._actions$.pipe(
    tap((action: ResultAction) => this._notificationService.showNotification(action))
  ), { dispatch: false })
}
