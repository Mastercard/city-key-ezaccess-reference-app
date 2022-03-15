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

import { SharedModule } from 'app/shared/modules/shared.module'
import { AllState, ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'
import { MOCK_CARDS, MOCK_PROGRAMS } from 'app/shared/testing/mock-objects'

import { UnassignProgram, UnassignProgramSuccess } from '../../ngrx/cards-list.actions'
import { CardsListUnassignProgramDialogComponent } from './unassign-program-dialog.component'

const cls = '.cards-list-unassign-program-dialog'
const submitBtnCls = `${cls}-submit-btn`
const cancelBtnCls = `${cls}-cancel-btn`

describe(CardsListUnassignProgramDialogComponent.name, () => {
  const card = MOCK_CARDS.items[0]
  const programId = MOCK_PROGRAMS.items[0].id

  const imports = [
    SharedModule
  ]

  const initialState = ALL_INITIAL_STATE

  const mockDialogDataProvider = {
    provide: MAT_DIALOG_DATA,
    useValue: { card, programId }
  }

  let stubClose: SinonStub
  let mockDialogRefProvider

  let stubActions$: BehaviorSubject<any>
  let mockActionsProvider

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<CardsListUnassignProgramDialogComponent>

  let container: any
  let fixture: ComponentFixture<CardsListUnassignProgramDialogComponent>
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
    ({ container, fixture } = await render(CardsListUnassignProgramDialogComponent, renderOptions))
    store = TestBed.inject(Store) as MockStore<AllState>
    spyStoreDispatch = spy(store, 'dispatch')
  })

  it('should disable form, Submit and Cancel button when in progress', () => {
    expect(container.querySelector(submitBtnCls).disabled).toBeFalse()
    expect(container.querySelector(submitBtnCls).querySelector('mat-spinner')).toBeFalsy()
    expect(container.querySelector(cancelBtnCls).disabled).toBeFalse()

    updateStoreAndFixture(store, {
      ...initialState,
      cardsList: {
        ...initialState.cardsList,
        unassignProgram: {
          isProcessing: true
        }
      }
    }, fixture)
    expect(container.querySelector(submitBtnCls).disabled).toBeTrue()
    expect(container.querySelector(submitBtnCls).querySelector('mat-spinner')).toBeTruthy()
    expect(container.querySelector(cancelBtnCls).disabled).toBeTrue()
  })

  it(`should dispatch ${UnassignProgram.name} when clicking Submit button`, async () => {
    fireEvent.click(container.querySelector(submitBtnCls))
    expect(spyStoreDispatch.lastCall.args).toEqual([new UnassignProgram(programId, card.eaid)])
  })

  it(`should close dialog when received ${UnassignProgramSuccess.name}`, () => {
    updateSubjectAndFixture(stubActions$, new UnassignProgramSuccess({} as UnassignProgram, {}), fixture)
    expect(stubClose.called).toBeTrue()
  })
})
