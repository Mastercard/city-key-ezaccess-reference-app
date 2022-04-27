import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Actions } from '@ngrx/effects'
import { BehaviorSubject } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { fireEvent, render, RenderComponentOptions } from '@testing-library/angular'
import { SinonSpy, SinonStub, spy, stub } from 'sinon'
import { createTestScheduler, updateStoreAndFixture, updateSubjectAndFixture } from 'ngx-mclabs-testing'

import { SharedModule } from 'app/shared/modules/shared.module'
import { PaginatedTableModule } from 'app/shared/components/paginated-table/paginated-table.module'
import { CardStatusType } from 'app/shared/constants'
import { AllState, ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'
import { MOCK_CARDS } from 'app/shared/testing/mock-objects'

import { AssignProgram, AssignProgramSuccess, ChangeCardStatus, ChangeCardStatusSuccess, GetCards, ReplaceCardEaid, ReplaceCardEaidSuccess, Reset, UnassignProgram, UnassignProgramSuccess } from './ngrx/cards-list.actions'
import { CardsListReplaceCardEaidDialogComponent } from './components/replace-card-eaid-dialog/replace-card-eaid-dialog.component'
import { CardsListAssignProgramDialogComponent } from './components/assign-program-dialog/assign-program-dialog.component'
import { CardsListChangeCardStatusDialogComponent } from './components/change-card-status-dialog/change-card-status-dialog.component'
import { CardsListUnassignProgramDialogComponent } from './components/unassign-program-dialog/unassign-program-dialog.component'
import { CardsListComponent } from './cards-list.component'

const cls = '.cards-list'
const tableCls = `${cls}-table`
const changeCardStatusBtnCls = `${cls}-change-card-status-btn`
const replaceCardEaidBtnCls = `${cls}-replace-card-eaid-btn`
const assignProgramBtnCls = `${cls}-assign-program-btn`
const unassignProgramBtnCls = `${cls}-unassign-program-btn`
const rowCls = '.mat-row'
const statusColCls = '.mat-column-status'
const processingRowCls = '.paginated-table-processing-row'

describe(CardsListComponent.name, () => {
  const imports = [
    SharedModule,
    PaginatedTableModule
  ]

  const initialState = ALL_INITIAL_STATE

  const loadingState = {
    ...initialState,
    cardsList: {
      ...initialState.cardsList,
      list: {
        ...initialState.cardsList.list,
        isProcessing: true
      }
    }
  }

  const loadedState = {
    ...initialState,
    cardsList: {
      ...initialState.cardsList,
      list: {
        ...initialState.cardsList.list,
        data: MOCK_CARDS
      }
    }
  }

  let testScheduler: TestScheduler

  let stubQueryParams: BehaviorSubject<any>
  let mockActivatedRouteProvider

  let stubNavigate: SinonStub
  let mockRouterProvider

  let stubOpen: SinonStub
  let mockMatDialogProvider

  let stubActions$: BehaviorSubject<any>
  let mockActionsProvider

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<CardsListComponent>

  let container: any
  let fixture: ComponentFixture<CardsListComponent>
  let store: MockStore<AllState>
  let scannedActions$: Actions
  let spyStoreDispatch: SinonSpy

  beforeEach(fakeAsync(async () => {
    testScheduler = createTestScheduler()

    stubQueryParams = new BehaviorSubject({})
    mockActivatedRouteProvider = {
      provide: ActivatedRoute,
      useValue: {
        queryParams: stubQueryParams.asObservable()
      }
    }

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
      mockActivatedRouteProvider,
      mockRouterProvider,
      mockMatDialogProvider,
      mockActionsProvider
    ]

    renderOptions = {
      imports,
      providers,
      schemas: [NO_ERRORS_SCHEMA]
    };

    ({ container, fixture } = await render(CardsListComponent, renderOptions))
    store = TestBed.inject(Store) as MockStore<AllState>;
    ({ scannedActions$ } = store)
    spyStoreDispatch = spy(store, 'dispatch')
    tick()
  }))

  it('should show spinner when loading', () => {
    expect(container.querySelector(tableCls).querySelector(processingRowCls).hidden).toBeTrue()
    updateStoreAndFixture(store, loadingState, fixture)
    expect(container.querySelector(tableCls).querySelector(processingRowCls).hidden).toBeFalse()
  })

  it('should show table items after loaded', () => {
    expect(container.querySelector(tableCls).querySelector(rowCls)).toBeFalsy()
    updateStoreAndFixture(store, loadedState, fixture)
    expect(container.querySelector(tableCls).querySelectorAll(rowCls).length).toEqual(MOCK_CARDS.items.length)
  })

  it(`should dispatch ${GetCards.name} at init`, () => {
    testScheduler.run(({ expectObservable }) => {
      expectObservable(scannedActions$).toBe('a', {
        a: new GetCards({ offset: 0, limit: 20 })
      })
    })
  })

  it(`should dispatch ${Reset.name} when destroyed`, () => {
    fixture.destroy()
    expect(spyStoreDispatch.lastCall.args).toEqual([new Reset()])
    TestBed.resetTestingModule()
  })

  describe(`dispatch ${GetCards.name}`, () => {
    afterEach(() => {
      expect(spyStoreDispatch.lastCall.args).toEqual([new GetCards({ offset: 0, limit: 20 })])
    })

    it(`when received ${AssignProgramSuccess.name}`, () => {
      updateSubjectAndFixture(stubActions$, new AssignProgramSuccess({} as AssignProgram, {}), fixture)
    })

    it(`when received ${ChangeCardStatusSuccess.name}`, () => {
      updateSubjectAndFixture(stubActions$, new ChangeCardStatusSuccess({} as ChangeCardStatus, {}), fixture)
    })

    it(`when received ${ReplaceCardEaidSuccess.name}`, () => {
      updateSubjectAndFixture(stubActions$, new ReplaceCardEaidSuccess({} as ReplaceCardEaid, {}), fixture)
    })

    it(`when received ${UnassignProgramSuccess.name}`, () => {
      updateSubjectAndFixture(stubActions$, new UnassignProgramSuccess({} as UnassignProgram, {}), fixture)
    })
  })

  describe('when items loaded', () => {
    let rows: any[]

    beforeEach(() => {
      updateStoreAndFixture(store, loadedState, fixture)
      rows = container.querySelector(tableCls).querySelectorAll(rowCls)
    })

    it('should show different UI for different card status', () => {
      expect(rows[0].querySelector(statusColCls).classList).toContain('text-accent')
      expect(rows[0].querySelector(changeCardStatusBtnCls).querySelector('mat-icon').innerText).toEqual('lock')
      expect(rows[0].querySelector(assignProgramBtnCls)).toBeTruthy()
      expect(rows[0].querySelector(unassignProgramBtnCls)).toBeTruthy()
      expect(rows[0].querySelector(replaceCardEaidBtnCls)).toBeTruthy()

      expect(rows[1].querySelector(statusColCls).classList).toContain('text-warn')
      expect(rows[1].querySelector(changeCardStatusBtnCls).querySelector('mat-icon').innerText).toEqual('no_encryption')
      expect(rows[1].querySelector(assignProgramBtnCls)).toBeFalsy()
      expect(rows[1].querySelector(unassignProgramBtnCls)).toBeFalsy()
      expect(rows[1].querySelector(replaceCardEaidBtnCls)).toBeFalsy()
    })

    it(`should open ${CardsListChangeCardStatusDialogComponent.name} when clicking Change Card Status button`, () => {
      fireEvent.click(rows[0].querySelector(changeCardStatusBtnCls))
      expect(stubOpen.lastCall.args).toEqual([
        CardsListChangeCardStatusDialogComponent, {
          panelClass: 'dialog-md',
          data: { card: MOCK_CARDS.items[0] }
        }
      ])
    })

    it(`should open ${CardsListReplaceCardEaidDialogComponent.name} when clicking Replace Card EAID button`, () => {
      fireEvent.click(rows[0].querySelector(replaceCardEaidBtnCls))
      expect(stubOpen.lastCall.args).toEqual([
        CardsListReplaceCardEaidDialogComponent, {
          panelClass: 'dialog-md',
          data: { card: MOCK_CARDS.items[0] }
        }
      ])
    })

    it(`should open ${CardsListAssignProgramDialogComponent.name} when clicking Assign Program button`, () => {
      fireEvent.click(rows[0].querySelector(assignProgramBtnCls))
      expect(stubOpen.lastCall.args).toEqual([
        CardsListAssignProgramDialogComponent, {
          panelClass: 'dialog-md',
          data: { card: MOCK_CARDS.items[0] }
        }
      ])
    })

    it(`should open ${CardsListUnassignProgramDialogComponent.name} when clicking Unassign Program button`, () => {
      fireEvent.click(rows[0].querySelectorAll(unassignProgramBtnCls)[0])
      expect(stubOpen.lastCall.args).toEqual([
        CardsListUnassignProgramDialogComponent, {
          panelClass: 'dialog-md',
          data: { card: MOCK_CARDS.items[0], programId: MOCK_CARDS.items[0].programIds[0] }
        }
      ])
    })
  })
})
