import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Location } from '@angular/common'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { render, RenderComponentOptions } from '@testing-library/angular'
import { SinonSpy, spy } from 'sinon'

import { SharedModule } from 'app/shared/modules/shared.module'
import { SearchActionHeaderModule } from 'app/shared/components/search-action-header/search-action-header.module'
import { AllState, ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'
import { MOCK_PROGRAMS } from 'app/shared/testing/mock-objects'

import { Reset } from './ngrx/programs-detail.actions'
import { ProgramsDetailComponent } from './programs-detail.component'

const cls = '.programs-detail'
const descriptionCls = `${cls}-description`

describe(ProgramsDetailComponent.name, () => {
  const program = MOCK_PROGRAMS.items[0]

  const imports = [
    SharedModule,
    SearchActionHeaderModule
  ]

  const initialState = ALL_INITIAL_STATE

  const mockLocationProvider = {
    provide: Location,
    useValue: {
      getState: () => ({ program })
    }
  }

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<ProgramsDetailComponent>

  let container: any
  let fixture: ComponentFixture<ProgramsDetailComponent>
  let store: MockStore<AllState>
  let spyStoreDispatch: SinonSpy

  beforeEach(async () => {
    providers = [
      provideMockStore({ initialState }),
      mockLocationProvider
    ]

    renderOptions = {
      imports,
      providers,
      schemas: [NO_ERRORS_SCHEMA],
      routes: []
    };

    ({ container, fixture } = await render(ProgramsDetailComponent, renderOptions))
    store = TestBed.inject(Store) as MockStore<AllState>
    spyStoreDispatch = spy(store, 'dispatch')
  })

  it('should show information after loaded', () => {
    expect(container.querySelector('.search-action-header-title').innerText).toEqual(`${program.id} - ${program.name}`)
    expect(container.querySelector(descriptionCls).innerText).toEqual(program.description)
  })

  it(`should dispatch ${Reset.name} when destroyed`, () => {
    fixture.destroy()
    expect(spyStoreDispatch.lastCall.args).toEqual([new Reset()])
    TestBed.resetTestingModule()
  })
})
