import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Actions } from '@ngrx/effects'
import { BehaviorSubject } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { fireEvent, render, RenderComponentOptions } from '@testing-library/angular'
import { SinonSpy, SinonStub, spy, stub } from 'sinon'
import { createTestScheduler, updateStoreAndFixture, updateSubjectAndFixture } from 'ngx-mclabs-testing'

import { PaginatedTableModule } from 'app/shared/components/paginated-table/paginated-table.module'
import { SharedModule } from 'app/shared/modules/shared.module'
import { AllState, ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'
import { MOCK_CARDS } from 'app/shared/testing/mock-objects'

import { UnassignCard, UnassignCardSuccess, GetCards } from '../../ngrx/programs-detail.actions'
import { ProgramsDetailUnassignCardDialogComponent } from '../unassign-card-dialog/unassign-card-dialog.component'
import { ProgramsDetailCardsTabComponent } from './cards-tab.component'

const cls = '.programs-detail-cards-tab'
const tableCls = `${cls}-table`
const unassignCardBtnCls = `${cls}-unassign-card-btn`
const rowCls = '.mat-row'
const processingRowCls = '.paginated-table-processing-row'

describe(ProgramsDetailCardsTabComponent.name, () => {
  const programId = 'programId'

  const imports = [
    SharedModule,
    PaginatedTableModule
  ]

  const initialState = ALL_INITIAL_STATE

  const loadingState = {
    ...initialState,
    programsDetail: {
      ...initialState.programsDetail,
      listCards: {
        ...initialState.programsDetail.listCards,
        isProcessing: true
      }
    }
  }

  const loadedState = {
    ...initialState,
    programsDetail: {
      ...initialState.programsDetail,
      listCards: {
        ...initialState.programsDetail.listCards,
        data: MOCK_CARDS
      }
    }
  }

  const mockActivatedRouteProvider = {
    provide: ActivatedRoute,
    useValue: {
      snapshot: {
        params: { programId }
      }
    }
  }

  let testScheduler: TestScheduler

  let stubOpen: SinonStub
  let mockMatDialogProvider

  let stubActions$: BehaviorSubject<any>
  let mockActionsProvider

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<ProgramsDetailCardsTabComponent>

  let container: any
  let fixture: ComponentFixture<ProgramsDetailCardsTabComponent>
  let store: MockStore<AllState>
  let scannedActions$: Actions
  let spyStoreDispatch: SinonSpy

  beforeEach(fakeAsync(async () => {
    testScheduler = createTestScheduler()

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
      mockMatDialogProvider,
      mockActionsProvider
    ]

    renderOptions = {
      imports,
      providers,
      schemas: [NO_ERRORS_SCHEMA]
    };

    ({ container, fixture } = await render(ProgramsDetailCardsTabComponent, renderOptions))
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
        a: new GetCards(programId, { offset: 0, limit: 20 })
      })
    })
  })

  it(`should dispatch ${GetCards.name} when received ${UnassignCardSuccess.name}`, () => {
    updateSubjectAndFixture(stubActions$, new UnassignCardSuccess({} as UnassignCard, {}), fixture)
    expect(spyStoreDispatch.lastCall.args).toEqual([new GetCards(programId, { offset: 0, limit: 20 })])
  })

  describe('when items loaded', () => {
    let rows: any[]

    beforeEach(() => {
      updateStoreAndFixture(store, loadedState, fixture)
      rows = container.querySelector(tableCls).querySelectorAll(rowCls)
    })

    it(`should open ${ProgramsDetailUnassignCardDialogComponent.name} when clicking Unassign Card button`, () => {
      fireEvent.click(rows[0].querySelector(unassignCardBtnCls))
      expect(stubOpen.lastCall.args).toEqual([
        ProgramsDetailUnassignCardDialogComponent, {
          panelClass: 'dialog-md',
          data: { programId, card: MOCK_CARDS.items[0] }
        }
      ])
    })
  })
})
