import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Action } from '@ngrx/store'
import { Nullable } from 'ngx-mclabs-utils'

import { NotySnackbarComponent } from 'app/shared/components/noty-snackbar/noty-snackbar.component'
import { NotificationConfig, ToastrType } from 'app/shared/constants'

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(
    private _matSnackBar: MatSnackBar
  ) { }

  showNotification(action: Action): void {
    const { noty } = action as any

    const message = this._getNotificationMessage(noty)
    const duration = this._getDuration(noty)
    const type = action.type.endsWith('Success') ? 'success' : 'error'

    const config = {
      ...duration ? { duration } : {},
      data: { message, type }
    }

    if (message) {
      this._matSnackBar.openFromComponent(NotySnackbarComponent, config)
    }
  }

  showAnyNotification(message: string, type: ToastrType): void {
    this._matSnackBar.openFromComponent(NotySnackbarComponent, { data: { message, type } })
  }

  private _getDuration(config: NotificationConfig): Nullable<number> {
    return typeof config === 'object' ? config.duration : null
  }

  private _getNotificationMessage(config: Nullable<NotificationConfig>): Nullable<string> {
    return typeof config === 'object' ? config?.message : config
  }
}
