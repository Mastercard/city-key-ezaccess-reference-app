import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Actions } from '@ngrx/effects'
import { TestScheduler } from 'rxjs/testing'
import { render, RenderComponentOptions } from '@testing-library/angular'
import { SinonSpy, spy } from 'sinon'
import { createTestScheduler, updateStoreAndFixture } from 'ngx-mclabs-testing'

import { SharedModule } from 'app/shared/modules/shared.module'
import { SearchActionHeaderModule } from 'app/shared/components/search-action-header/search-action-header.module'
import { PaginatedTableModule } from 'app/shared/components/paginated-table/paginated-table.module'
import { AllState, ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'
import { MOCK_PROGRAMS } from 'app/shared/testing/mock-objects'

import { GetPrograms, Reset } from './ngrx/programs-list.actions'
import { ProgramsListComponent } from './programs-list.component'

const cls = '.programs-list'
const tableCls = `${cls}-table`
const rowCls = '.mat-row'
const processingRowCls = '.paginated-table-processing-row'

describe(ProgramsListComponent.name, () => {
  const imports = [
    SharedModule,
    SearchActionHeaderModule,
    PaginatedTableModule
  ]

  const initialState = ALL_INITIAL_STATE

  const loadingState = {
    ...initialState,
    programsList: {
      ...initialState.programsList,
      list: {
        ...initialState.programsList.list,
        isProcessing: true
      }
    }
  }

  const loadedState = {
    ...initialState,
    programsList: {
      ...initialState.programsList,
      list: {
        ...initialState.programsList.list,
        data: MOCK_PROGRAMS
      }
    }
  }

  let testScheduler: TestScheduler

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<ProgramsListComponent>

  let container: any
  let fixture: ComponentFixture<ProgramsListComponent>
  let store: MockStore<AllState>
  let scannedActions$: Actions
  let spyStoreDispatch: SinonSpy

  beforeEach(fakeAsync(async () => {
    testScheduler = createTestScheduler()

    providers = [
      provideMockStore({ initialState })
    ]

    renderOptions = {
      imports,
      providers,
      schemas: [NO_ERRORS_SCHEMA],
      routes: []
    };

    ({ container, fixture } = await render(ProgramsListComponent, renderOptions))
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
    expect(container.querySelector(tableCls).querySelectorAll(rowCls).length).toEqual(MOCK_PROGRAMS.items.length)
  })

  it(`should dispatch ${GetPrograms.name} at init`, () => {
    testScheduler.run(({ expectObservable }) => {
      expectObservable(scannedActions$).toBe('a', {
        a: new GetPrograms({ offset: 0, limit: 20 })
      })
    })
  })

  it(`should dispatch ${Reset.name} when destroyed`, () => {
    fixture.destroy()
    expect(spyStoreDispatch.lastCall.args).toEqual([new Reset()])
    TestBed.resetTestingModule()
  })
})
