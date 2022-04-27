import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Actions } from '@ngrx/effects'
import { BehaviorSubject } from 'rxjs'
import { fireEvent, render, RenderComponentOptions } from '@testing-library/angular'
import { SinonSpy, SinonStub, spy, stub } from 'sinon'
import { updateStoreAndFixture, updateSubjectAndFixture } from 'ngx-mclabs-testing'

import { CardStatusType } from 'app/shared/constants'
import { AllState, ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'
import { MOCK_CARDS } from 'app/shared/testing/mock-objects'

import { ChangeCardStatus, ChangeCardStatusSuccess } from '../../ngrx/cards-list.actions'
import { CardsListChangeCardStatusDialogComponent } from './change-card-status-dialog.component'

const cls = '.cards-list-change-card-status-dialog'
const submitBtnCls = `${cls}-submit-btn`
const cancelBtnCls = `${cls}-cancel-btn`
const matDialogTitleSel = '[mat-dialog-title]'
const matDialogContentSel = 'mat-dialog-content'

describe(CardsListChangeCardStatusDialogComponent.name, () => {
  const activeCard = MOCK_CARDS.items[0]
  const blockedCard = MOCK_CARDS.items[1]

  const initialState = ALL_INITIAL_STATE

  const mockDialogDataProviderActiveCard = {
    provide: MAT_DIALOG_DATA,
    useValue: { card: activeCard }
  }

  const mockDialogDataProviderBlockedCard = {
    provide: MAT_DIALOG_DATA,
    useValue: { card: blockedCard }
  }

  let stubClose: SinonStub
  let mockDialogRefProvider

  let stubActions$: BehaviorSubject<any>
  let mockActionsProvider

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<CardsListChangeCardStatusDialogComponent>

  let container: any
  let fixture: ComponentFixture<CardsListChangeCardStatusDialogComponent>
  let store: MockStore<AllState>
  let spyStoreDispatch: SinonSpy

  async function rerender(blockCard: boolean): Promise<void> {
    stubClose = stub()
    mockDialogRefProvider = {
      provide: MatDialogRef,
      useValue: { close: stubClose }
    }

    stubActions$ = new BehaviorSubject({})
    mockActionsProvider = {
      provide: Actions,
      useValue: stubActions$.asObservable()
    }

    providers = [
      provideMockStore({ initialState }),
      mockDialogRefProvider,
      blockCard ? mockDialogDataProviderActiveCard : mockDialogDataProviderBlockedCard,
      mockActionsProvider
    ]

    renderOptions = {
      providers,
      schemas: [NO_ERRORS_SCHEMA]
    }

    TestBed.resetTestingModule();
    ({ container, fixture } = await render(CardsListChangeCardStatusDialogComponent, renderOptions))
    store = TestBed.inject(Store) as MockStore<AllState>
    spyStoreDispatch = spy(store, 'dispatch')
  }

  beforeEach(async () => {
    await rerender(true)
  })

  it('should show different UI for different card status', async () => {
    expect(container.querySelector(matDialogTitleSel).innerText).toEqual('Block Card')
    expect(container.querySelector(matDialogContentSel).innerText).toEqual(`Are you sure you want to block "${activeCard.last4Digits}" card?`)
    expect(container.querySelector(submitBtnCls).innerText).toEqual('Block')

    await rerender(false)
    expect(container.querySelector(matDialogTitleSel).innerText).toEqual('Unblock Card')
    expect(container.querySelector(matDialogContentSel).innerText).toEqual(`Are you sure you want to unblock "${blockedCard.last4Digits}" card?`)
    expect(container.querySelector(submitBtnCls).innerText).toEqual('Unblock')
  })

  it('should disable form, Submit and Cancel button when in progress', () => {
    expect(container.querySelector(submitBtnCls).disabled).toBeFalse()
    expect(container.querySelector(submitBtnCls).querySelector('mat-spinner')).toBeFalsy()
    expect(container.querySelector(cancelBtnCls).disabled).toBeFalse()

    updateStoreAndFixture(store, {
      ...initialState,
      cardsList: {
        ...initialState.cardsList,
        changeCardStatus: {
          isProcessing: true
        }
      }
    }, fixture)
    expect(container.querySelector(submitBtnCls).disabled).toBeTrue()
    expect(container.querySelector(submitBtnCls).querySelector('mat-spinner')).toBeTruthy()
    expect(container.querySelector(cancelBtnCls).disabled).toBeTrue()
  })

  it(`should dispatch ${ChangeCardStatus.name} when clicking Submit button`, async () => {
    fireEvent.click(container.querySelector(submitBtnCls))
    expect(spyStoreDispatch.lastCall.args).toEqual([new ChangeCardStatus(activeCard.eaid, { status: CardStatusType.BLOCKED })])

    await rerender(false)
    fireEvent.click(container.querySelector(submitBtnCls))
    expect(spyStoreDispatch.lastCall.args).toEqual([new ChangeCardStatus(blockedCard.eaid, { status: CardStatusType.ACTIVE })])
  })

  it(`should close dialog when received ${ChangeCardStatusSuccess.name}`, () => {
    updateSubjectAndFixture(stubActions$, new ChangeCardStatusSuccess({} as ChangeCardStatus, {}), fixture)
    expect(stubClose.called).toBeTrue()
  })
})
