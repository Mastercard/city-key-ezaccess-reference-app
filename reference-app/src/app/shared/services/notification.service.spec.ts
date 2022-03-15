import { TestBed } from '@angular/core/testing'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SinonStub, stub } from 'sinon'

import { RegisterCards, RegisterCardsFailure, RegisterCardsSuccess } from 'app/features/cards/prepare/ngrx/cards-prepare.actions'
import { NotySnackbarComponent } from 'app/shared/components/noty-snackbar/noty-snackbar.component'

import { NotificationService } from './notification.service'

describe(NotificationService.name, () => {
  const message = 'message'

  let stubOpenFromComponent: SinonStub

  let service: NotificationService

  let action

  beforeEach(() => {
    stubOpenFromComponent = stub()

    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatSnackBar,
          useValue: {
            openFromComponent: stubOpenFromComponent
          }
        }
      ]
    })

    service = TestBed.inject(NotificationService)
  })

  it('should show simple notification', () => {
    action = new RegisterCardsSuccess({} as RegisterCards, {})
    service.showNotification(action)
    expect(stubOpenFromComponent.lastCall.args).toEqual([NotySnackbarComponent, { data: { message: action.noty, type: 'success' } }])

    action = new RegisterCardsFailure({} as RegisterCards, {})
    service.showNotification(action)
    expect(stubOpenFromComponent.lastCall.args).toEqual([NotySnackbarComponent, { data: { message: action.noty, type: 'error' } }])
  })

  it('should show any notification', () => {
    service.showAnyNotification(message, 'success')
    expect(stubOpenFromComponent.lastCall.args).toEqual([NotySnackbarComponent, { data: { message, type: 'success' } }])
  })

  it('should not show notification for empty noty config', () => {
    action = new RegisterCards({})
    service.showNotification(action)
    expect(stubOpenFromComponent.notCalled).toBeTrue()
  })
})
