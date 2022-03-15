import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Actions } from '@ngrx/effects'
import { BehaviorSubject } from 'rxjs'
import { fireEvent, render, RenderComponentOptions } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { SinonSpy, SinonStub, spy, stub } from 'sinon'
import { updateStoreAndFixture, updateSubjectAndFixture } from 'ngx-mclabs-testing'

import { SharedModule } from 'app/shared/modules/shared.module'
import { AllState, ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'
import { MOCK_CARDS } from 'app/shared/testing/mock-objects'

import { ReplaceCardEaid, ReplaceCardEaidSuccess } from '../../ngrx/cards-list.actions'
import { CardsListReplaceCardEaidDialogComponent } from './replace-card-eaid-dialog.component'

const cls = '.cards-list-replace-card-eaid-dialog'
const formCls = `${cls}-form`
const formEaidCls = `${formCls}-eaid`
const submitBtnCls = `${cls}-submit-btn`
const cancelBtnCls = `${cls}-cancel-btn`
const matSpinnerSel = 'mat-spinner'

describe(CardsListReplaceCardEaidDialogComponent.name, () => {
  const card = MOCK_CARDS.items[0]
  const eaid = '0000010001000040'

  const imports = [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]

  const initialState = ALL_INITIAL_STATE

  const mockDialogDataProvider = {
    provide: MAT_DIALOG_DATA,
    useValue: { card }
  }

  let stubClose: SinonStub
  let mockDialogRefProvider

  let stubActions$: BehaviorSubject<any>
  let mockActionsProvider

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<CardsListReplaceCardEaidDialogComponent>

  let container: any
  let fixture: ComponentFixture<CardsListReplaceCardEaidDialogComponent>
  let store: MockStore<AllState>
  let spyStoreDispatch: SinonSpy

  beforeEach(async () => {
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
      mockDialogDataProvider,
      mockActionsProvider
    ]

    renderOptions = {
      imports,
      providers,
      schemas: [NO_ERRORS_SCHEMA]
    }

    TestBed.resetTestingModule();
    ({ container, fixture } = await render(CardsListReplaceCardEaidDialogComponent, renderOptions))
    store = TestBed.inject(Store) as MockStore<AllState>
    spyStoreDispatch = spy(store, 'dispatch')
  })

  describe('when form filled', () => {
    beforeEach(() => {
      userEvent.type(container.querySelector(formEaidCls).querySelector('input'), eaid)
    })

    it('should disable form, Submit and Cancel button when in progress', () => {
      expect(container.querySelector(submitBtnCls).disabled).toBeFalse()
      expect(container.querySelector(submitBtnCls).querySelector(matSpinnerSel)).toBeFalsy()
      expect(container.querySelector(cancelBtnCls).disabled).toBeFalse()

      updateStoreAndFixture(store, {
        ...initialState,
        cardsList: {
          ...initialState.cardsList,
          replaceCardEaid: {
            isProcessing: true
          }
        }
      }, fixture)
      container.querySelector(formCls).querySelectorAll('input').forEach((el: any) => {
        expect(el.disabled).toBeTrue()
      })
      expect(container.querySelector(submitBtnCls).disabled).toBeTrue()
      expect(container.querySelector(submitBtnCls).querySelector(matSpinnerSel)).toBeTruthy()
      expect(container.querySelector(cancelBtnCls).disabled).toBeTrue()
    })

    it(`should dispatch ${ReplaceCardEaid.name} when clicking Submit button`, () => {
      fireEvent.click(container.querySelector(submitBtnCls))
      expect(spyStoreDispatch.lastCall.args).toEqual([new ReplaceCardEaid(card.eaid, { eaid })])
    })

    it(`should close dialog when received ${ReplaceCardEaidSuccess.name}`, () => {
      updateSubjectAndFixture(stubActions$, new ReplaceCardEaidSuccess({} as ReplaceCardEaid, {}), fixture)
      expect(stubClose.called).toBeTrue()
    })
  })
})
