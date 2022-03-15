import { TestBed } from '@angular/core/testing'
import { Actions } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { stub } from 'sinon'
import { createTestScheduler } from 'ngx-mclabs-testing'

import { RegisterCards, RegisterCardsSuccess } from 'app/features/cards/prepare/ngrx/cards-prepare.actions'
import { NotificationService } from 'app/shared/services/notification.service'

import { NotificationEffects } from './notification.effects'

describe(NotificationEffects.name, () => {
  it(`should call ${NotificationService.prototype.showNotification.name}() when received action`, done => {
    const stubShowNotification = stub()

    let actions$: Actions

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        { provide: NotificationService, useValue: { showNotification: stubShowNotification } },
        NotificationEffects
      ]
    })

    const effects = TestBed.inject(NotificationEffects)

    createTestScheduler().run(({ hot }) => {
      const action = new RegisterCardsSuccess({} as RegisterCards, {})
      actions$ = hot('-a', { a: action })
      effects.allActions$.subscribe(() => {
        expect(stubShowNotification.lastCall.args).toEqual([action])
        done()
      })
    })
  })
})
