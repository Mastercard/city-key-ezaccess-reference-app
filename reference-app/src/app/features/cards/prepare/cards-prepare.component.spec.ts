import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Actions } from '@ngrx/effects'
import { BehaviorSubject } from 'rxjs'
import * as Papaparse from 'papaparse'
import { fireEvent, render, RenderComponentOptions } from '@testing-library/angular'
import { SinonSpy, SinonStub, spy, stub } from 'sinon'
import { updateStoreAndFixture, updateSubjectAndFixture } from 'ngx-mclabs-testing'

import { SharedModule } from 'app/shared/modules/shared.module'
import { PROGRAM_ID } from 'app/shared/constants'
import { AllState, ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'
import { MOCK_EAIDS, MOCK_PROGRAMS } from 'app/shared/testing/mock-objects'

import { CreateEaids, RegisterCards, RegisterCardsSuccess, Reset } from './ngrx/cards-prepare.actions'
import { CardsPrepareAssignCardDialogComponent } from './components/assign-card-dialog/assign-card-dialog.component'
import { CardsPrepareAssignProgramDialogComponent } from './components/assign-program-dialog/assign-program-dialog.component'
import { CardsPrepareComponent } from './cards-prepare.component'

const cls = '.cards-prepare'
const formCls = `${cls}-form`
const formSubmitBtnCls = `${formCls}-submit-btn`
const associateCls = `${cls}-associate`
const associateTableCls = `${associateCls}-table`
const associateTableSelectedCountCls = `${associateTableCls}-selected-count`
const associateDownloadBtnCls = `${associateCls}-download-btn`
const associateUploadBtnCls = `${associateCls}-upload-btn`
const associateUploadedFileNameCls = `${associateCls}-uploaded-file-name`
const assignCardBtnCls = `${cls}-assign-card-btn`
const assignProgramBtnCls = `${cls}-assign-program-btn`
const addCardsBtnCls = `${cls}-add-cards-btn`
const checkColCls = '.mat-column-check'
const eaidColCls = '.mat-column-eaid'
const programIdColCls = '.mat-column-programId'
const last4DigitsColCls = '.mat-column-last4Digits'
const headerRowCls = '.mat-header-row'
const rowCls = '.mat-row'
const matSpinnerSel = 'mat-spinner'

describe(CardsPrepareComponent.name, () => {
  const rangeId = 1
  const startNumber = 1
  const endNumber = 20
  const showUnused = true

  const last4Digits = '1221'
  const programId = MOCK_PROGRAMS.items[0].id

  const csvData = [
    ['eaid', 'programId', 'last4Digits'],
    ['\'0000010001000016', PROGRAM_ID, '3333'],
    ['\'0000010001000024', PROGRAM_ID, '2212'],
    ['\'0000010001000032', PROGRAM_ID, '1232']
  ]

  const uploadedData = [
    { eaid: '0000010001000016', programId: PROGRAM_ID, last4Digits: '3333' },
    { eaid: '0000010001000024', programId: PROGRAM_ID, last4Digits: '2212' }
  ]

  const imports = [
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    SharedModule
  ]

  const initialState = ALL_INITIAL_STATE

  let stubNavigate: SinonStub
  let mockRouterProvider

  let stubOpen: SinonStub
  let mockMatDialogProvider

  let stubActions$: BehaviorSubject<any>
  let mockActionsProvider

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<CardsPrepareComponent>

  let container: any
  let fixture: ComponentFixture<CardsPrepareComponent>
  let store: MockStore<AllState>
  let spyStoreDispatch: SinonSpy

  beforeEach(async () => {
    stubNavigate = stub()
    mockRouterProvider = {
      provide: Router,
      useValue: { navigate: stubNavigate }
    }

    stubOpen = stub()
    mockMatDialogProvider = {
      provide: MatDialog,
      useValue: { open: stubOpen }
    }

    stubActions$ = new BehaviorSubject({})
    mockActionsProvider = {
      provide: Actions,
      useValue: stubActions$.asObservable()
    }

    providers = [
      provideMockStore({ initialState }),
      mockActionsProvider,
      mockRouterProvider,
      mockMatDialogProvider
    ]

    renderOptions = {
      imports,
      providers,
      schemas: [NO_ERRORS_SCHEMA]
    }

    TestBed.resetTestingModule();
    ({ container, fixture } = await render(CardsPrepareComponent, renderOptions))
    store = TestBed.inject(Store) as MockStore<AllState>
    spyStoreDispatch = spy(store, 'dispatch')
  })

  it(`should dispatch ${Reset.name} when destroyed`, () => {
    fixture.destroy()
    expect(spyStoreDispatch.lastCall.args).toEqual([new Reset()])
    TestBed.resetTestingModule()
  })

  it('should disable form, Submit button when in progress', () => {
    expect(container.querySelector(formSubmitBtnCls).disabled).toBeFalse()
    expect(container.querySelector(formSubmitBtnCls).querySelector(matSpinnerSel)).toBeFalsy()

    updateStoreAndFixture(store, {
      ...initialState,
      cardsPrepare: {
        ...initialState.cardsPrepare,
        createEaids: {
          isProcessing: true
        }
      }
    }, fixture)
    container.querySelector(formCls).querySelectorAll('input').forEach((el: any) => {
      expect(el.disabled).toBeTrue()
    })
    expect(container.querySelector(formSubmitBtnCls).disabled).toBeTrue()
    expect(container.querySelector(formSubmitBtnCls).querySelector(matSpinnerSel)).toBeTruthy()
  })

  it(`should dispatch ${CreateEaids.name} when clicking Submit button`, () => {
    fireEvent.click(container.querySelector(formSubmitBtnCls))
    expect(spyStoreDispatch.lastCall.args).toEqual([new CreateEaids({ rangeId, startNumber, endNumber, showUnused })])
  })

  it('should parse CSV after submitting file', () => {
    const spyParse = spy(Papaparse, 'parse')

    const str = `${csvData.map(r => r.join(',')).join('\n')}`
    const file = new File([str], 'file.csv', { type: 'text/csv;charset=utf-8;' })
    fireEvent.change(
      container.querySelector(associateUploadBtnCls).querySelector('input'),
      { target: { files: [file] } }
    )
    expect(spyParse.lastCall.args[0] as unknown).toEqual(file)
  })

  describe('when data is loaded', () => {
    beforeEach(() => {
      updateStoreAndFixture(store, {
        ...initialState,
        cardsPrepare: {
          ...initialState.cardsPrepare,
          createEaids: {
            data: MOCK_EAIDS
          }
        }
      }, fixture)
    })

    it('should enable Download EAIDs button', () => {
      expect(container.querySelector(associateDownloadBtnCls).disabled).toBeFalse()
      expect(container.querySelector(associateUploadedFileNameCls).innerText).toEqual('')
    })

    it('should show data from create EAIDs response', async () => {
      const rows = container.querySelector(associateTableCls).querySelectorAll(rowCls)
      expect(rows.length).toEqual(10)
      rows.forEach((row: any, i: number) => {
        expect(row.querySelector(eaidColCls).innerText).toEqual(MOCK_EAIDS.eaids[i])
        expect(row.querySelector(programIdColCls).innerText).toEqual('')
        expect(row.querySelector(last4DigitsColCls).innerText).toEqual('')
      })
    })

    it('should show checkbox column and Assign Card button when on Manual Tab', () => {
      expect(container.querySelector(associateTableCls).querySelector(checkColCls)).toBeFalsy()
      expect(container.querySelector(associateTableCls).querySelector(assignCardBtnCls)).toBeFalsy()
      fixture.componentInstance.onTabSelectedIndexChange(1)
      fixture.detectChanges()
      expect(container.querySelector(associateTableCls).querySelector(checkColCls)).toBeTruthy()
      expect(container.querySelector(associateTableCls).querySelector(assignCardBtnCls)).toBeTruthy()
    })

    describe('actions', () => {
      let rows: any

      beforeEach(() => {
        fixture.componentInstance.onTabSelectedIndexChange(1)
        fixture.detectChanges()
        rows = container.querySelector(associateTableCls).querySelectorAll(rowCls)
      })

      it('should check all rows', () => {
        fireEvent.click(container.querySelector(associateTableCls).querySelector(headerRowCls).querySelector(checkColCls).querySelector('label'))
        rows.forEach((row: any) => {
          expect(row.querySelector(checkColCls).querySelector('mat-checkbox')).toHaveClass('mat-checkbox-checked')
        })
        expect(container.querySelector(associateTableSelectedCountCls).innerText).toEqual(`${MOCK_EAIDS.eaids.length} row(s) selected`)
      })

      it(`should open ${CardsPrepareAssignCardDialogComponent.name} when clicking Assign Card button`, () => {
        const stubAfterClosed = new BehaviorSubject<string>('')
        stubOpen.returns({
          afterClosed: () => stubAfterClosed.asObservable()
        })

        fireEvent.click(rows[0].querySelector(assignCardBtnCls))
        expect(stubOpen.lastCall.args).toEqual([
          CardsPrepareAssignCardDialogComponent, {
            panelClass: 'dialog-md'
          }
        ])

        stubAfterClosed.next(last4Digits)
        fixture.detectChanges()
        expect(rows[0].querySelector(last4DigitsColCls).innerText).toContain(last4Digits)
      })

      it(`should open ${CardsPrepareAssignProgramDialogComponent.name} when clicking Assign Program button`, () => {
        const stubAfterClosed = new BehaviorSubject<string>('')
        stubOpen.returns({
          afterClosed: () => stubAfterClosed.asObservable()
        })

        fireEvent.click(rows[0].querySelector(checkColCls).querySelector('label'))
        fireEvent.click(rows[1].querySelector(checkColCls).querySelector('label'))

        fireEvent.click(container.querySelector(assignProgramBtnCls))
        expect(stubOpen.lastCall.args).toEqual([
          CardsPrepareAssignProgramDialogComponent, {
            panelClass: 'dialog-md'
          }
        ])

        stubAfterClosed.next(programId)
        fixture.detectChanges()
        expect(rows[0].querySelector(programIdColCls).innerText).toContain(programId)
        expect(rows[1].querySelector(programIdColCls).innerText).toContain(programId)
      })
    })
  })

  describe('when data is valid', () => {
    beforeEach(() => {
      expect(container.querySelector(addCardsBtnCls).disabled).toBeTrue()
      fixture.componentInstance.tableEaids.data = uploadedData
      fixture.detectChanges()
      expect(container.querySelector(addCardsBtnCls).disabled).toBeFalse()
    })

    it('should disable Add Cards button when in progress', () => {
      expect(container.querySelector(addCardsBtnCls).disabled).toBeFalse()
      expect(container.querySelector(addCardsBtnCls).querySelector(matSpinnerSel)).toBeFalsy()

      updateStoreAndFixture(store, {
        ...initialState,
        cardsPrepare: {
          ...initialState.cardsPrepare,
          registerCards: {
            isProcessing: true
          }
        }
      }, fixture)
      expect(container.querySelector(addCardsBtnCls).disabled).toBeTrue()
      expect(container.querySelector(addCardsBtnCls).querySelector(matSpinnerSel)).toBeTruthy()
    })

    it(`should dispatch ${RegisterCards.name} when clicking Add Cards button`, () => {
      fireEvent.click(container.querySelector(addCardsBtnCls))
      expect(spyStoreDispatch.lastCall.args).toEqual([new RegisterCards({
        programIds: [PROGRAM_ID],
        cards: [
          { eaid: uploadedData[0].eaid, last4Digits: +uploadedData[0].last4Digits },
          { eaid: uploadedData[1].eaid, last4Digits: +uploadedData[1].last4Digits }
        ]
      })])
    })

    it(`should navigate to /cards when received ${RegisterCardsSuccess.name}`, () => {
      updateSubjectAndFixture(stubActions$, new RegisterCardsSuccess({} as RegisterCards, {}), fixture)
      expect(stubNavigate.lastCall.args).toEqual([['/cards']])
    })
  })
})
