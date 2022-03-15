import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
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
import { clickMatSelect, selectMatOptionByLabel } from 'app/shared/testing/material.testUtils'
import { MOCK_CARDS, MOCK_PROGRAMS } from 'app/shared/testing/mock-objects'

import { AssignProgram, AssignProgramSuccess } from '../../ngrx/cards-list.actions'
import { CardsListAssignProgramDialogComponent } from './assign-program-dialog.component'

const cls = '.cards-list-assign-program-dialog'
const formCls = `${cls}-form`
const formProgramIdCls = `${formCls}-programId`
const submitBtnCls = `${cls}-submit-btn`
const cancelBtnCls = `${cls}-cancel-btn`
const matSpinnerSel = 'mat-spinner'

describe(CardsListAssignProgramDialogComponent.name, () => {
  const card = MOCK_CARDS.items[0]
  const { id: programId, name: programName } = MOCK_PROGRAMS.items[0]

  const imports = [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule
  ]

  const initialState = {
    ...ALL_INITIAL_STATE,
    resource: {
      ...ALL_INITIAL_STATE.resource,
      programsRes: {
        ...ALL_INITIAL_STATE.resource.programsRes,
        data: MOCK_PROGRAMS
      }
    }
  }

  const mockDialogDataProvider = {
    provide: MAT_DIALOG_DATA,
    useValue: { card }
  }

  let stubClose: SinonStub
  let mockDialogRefProvider

  let stubActions$: BehaviorSubject<any>
  let mockActionsProvider

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<CardsListAssignProgramDialogComponent>

  let container: any
  let fixture: ComponentFixture<CardsListAssignProgramDialogComponent>
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
    ({ container, fixture } = await render(CardsListAssignProgramDialogComponent, renderOptions))
    store = TestBed.inject(Store) as MockStore<AllState>
    spyStoreDispatch = spy(store, 'dispatch')
  })

  describe('when form filled', () => {
    beforeEach(async () => {
      clickMatSelect(container.querySelector(formProgramIdCls))
      selectMatOptionByLabel(programName)
      await fixture.whenStable()
    })

    it('should disable form, Submit and Cancel button when in progress', () => {
      expect(container.querySelector(submitBtnCls).disabled).toBeFalse()
      expect(container.querySelector(submitBtnCls).querySelector(matSpinnerSel)).toBeFalsy()
      expect(container.querySelector(cancelBtnCls).disabled).toBeFalse()

      updateStoreAndFixture(store, {
        ...initialState,
        cardsList: {
          ...initialState.cardsList,
          assignProgram: {
            isProcessing: true
          }
        }
      }, fixture)
      expect(container.querySelector(submitBtnCls).disabled).toBeTrue()
      expect(container.querySelector(submitBtnCls).querySelector(matSpinnerSel)).toBeTruthy()
      expect(container.querySelector(cancelBtnCls).disabled).toBeTrue()
    })

    it(`should dispatch ${AssignProgram.name} when clicking Submit button`, () => {
      fireEvent.click(container.querySelector(submitBtnCls))
      expect(spyStoreDispatch.lastCall.args).toEqual([new AssignProgram(programId, { eaid: card.eaid })])
    })

    it(`should close dialog when received ${AssignProgramSuccess.name}`, () => {
      updateSubjectAndFixture(stubActions$, new AssignProgramSuccess({} as AssignProgram, {}), fixture)
      expect(stubClose.called).toBeTrue()
    })
  })
})
