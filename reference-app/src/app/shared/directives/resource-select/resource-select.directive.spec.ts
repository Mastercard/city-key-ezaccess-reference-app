import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store, StoreModule } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { SinonSpy, spy } from 'sinon'
import { updateStoreAndFixture } from 'ngx-mclabs-testing'

import { GetProgramsRes } from 'app/shared/ngrx/resource/resource.actions'
import { AllState, ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'
import { MOCK_PROGRAMS } from 'app/shared/testing/mock-objects'

import { ResourceSelectDirective } from './resource-select.directive'

describe(ResourceSelectDirective.name, () => {
  const initialState = ALL_INITIAL_STATE

  const updatedState = {
    ...initialState,
    resource: {
      ...initialState.resource,
      programsRes: {
        ...initialState.resource.programsRes,
        data: MOCK_PROGRAMS
      }
    }
  }

  const loadingState = {
    ...initialState,
    resource: {
      ...initialState.resource,
      programsRes: {
        ...initialState.resource.programsRes,
        isProcessing: true
      }
    }
  }

  let container: any
  let fixture: ComponentFixture<TestComponent>
  let store: MockStore<AllState>
  let spyStoreDispatch: SinonSpy

  async function rerender(resSelect: string | [string, (_: unknown) => unknown[]]): Promise<void> {
    TestBed.resetTestingModule()

    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({})],
      declarations: [ResourceSelectDirective, TestComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents()

    store = TestBed.inject(Store) as MockStore<AllState>
    spyStoreDispatch = spy(store, 'dispatch')

    fixture = TestBed.createComponent(TestComponent)
    fixture.componentInstance.resSelect = resSelect
    fixture.detectChanges()
    container = fixture.nativeElement
  }

  it('should not dispatch resource action if resource key is invalid', async () => {
    await rerender('anyRes')
    expect(spyStoreDispatch.called).toBeFalse()
  })

  describe('resource key is valid', () => {
    beforeEach(async () => {
      await rerender('programsRes')
    })

    it('should dispatch resource action if resource key is valid', () => {
      expect(spyStoreDispatch.lastCall.args).toEqual([new GetProgramsRes()])
      expect(container.querySelector('option')).toBeFalsy()
    })

    it('should show loading', () => {
      expect(container.querySelector('.loading')).toBeFalsy()
      updateStoreAndFixture(store, loadingState, fixture)
      expect(container.querySelector('.loading')).toBeTruthy()
    })

    it('should show items', () => {
      updateStoreAndFixture(store, updatedState, fixture)
      const options = container.querySelectorAll('option')
      expect(options.length).toEqual(MOCK_PROGRAMS.items.length)
      options.forEach((el: any, i: number) => {
        expect(el.value).toEqual(MOCK_PROGRAMS.items[i].id)
        expect(el.innerText.trim()).toEqual(MOCK_PROGRAMS.items[i].name)
      })
    })

    it('should show items with transformation mapping', async () => {
      await rerender([
        'programsRes',
        (data: any) => data.items.map(({ id, name }: { id: string, name: string }) => ({ id, name: `custom ${name}` }))
      ])
      updateStoreAndFixture(store, updatedState, fixture)
      container.querySelectorAll('option').forEach((el: any, i: number) => {
        expect(el.value).toEqual(MOCK_PROGRAMS.items[i].id)
        expect(el.innerText.trim()).toEqual(`custom ${MOCK_PROGRAMS.items[i].name}`)
      })
    })
  })
})

@Component({
  template: `
    <ng-container *resourceSelect="resSelect; let items$; isLoading$ as isLoading$">
      <div class="loading" *ngIf="isLoading$ | async"></div>
      <select>
        <option *ngFor="let item of items$ | async" [value]="item.id">
          {{item.name}}
        </option>
      </select>
    </ng-container>`
})
class TestComponent {
  @Input()
    resSelect!: string | [string, (_: unknown) => unknown[]]
}
