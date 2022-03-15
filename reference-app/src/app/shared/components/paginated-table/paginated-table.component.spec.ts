import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { fireEvent, render, RenderComponentOptions } from '@testing-library/angular'
import { updateStoreAndFixture } from 'ngx-mclabs-testing'

import { MOCK_CARDS } from 'app/shared/testing/mock-objects'
import { OffsetAndLimit } from 'app/shared/constants'
import { AllState, ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'

import { PaginatedTableModule } from './paginated-table.module'
import { PaginatedTableComponent } from './paginated-table.component'

const cls = '.paginated-table'
const tableCls = `${cls}-mat-table`
const emptyDataRowCls = `${cls}-empty-data-row`
const emptyDataCellCls = `${cls}-empty-data-cell`
const processingRowCls = `${cls}-processing-row`
const processingCellCls = `${cls}-processing-cell`
const paginatorCls = `${cls}-paginator`

describe(PaginatedTableComponent.name, () => {
  const initialState = ALL_INITIAL_STATE

  const imports = [PaginatedTableModule]

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<PaginatedTableComponent<any>>

  let container: any
  let fixture: ComponentFixture<TestComponent>
  let store: MockStore<AllState>

  async function rerender(props?: any): Promise<void> {
    TestBed.resetTestingModule()
    providers = [provideMockStore({ initialState })]

    renderOptions = {
      imports,
      providers,
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: props
    };

    ({ container, fixture } = await render(TestComponent, renderOptions))
    store = TestBed.inject(Store) as MockStore<AllState>
  }

  beforeEach(fakeAsync(async () => {
    await rerender()
    tick()
  }))

  it('should show and hide paginator', async () => {
    expect(container.querySelector(paginatorCls)).toBeTruthy()
    await rerender({ isPaginable: false })
    expect(container.querySelector(paginatorCls)).toBeFalsy()
  })

  it('should toggle clickable class', async () => {
    expect(container.querySelector(tableCls).classList).toContain('clickable')
    await rerender({ isClickable: false })
    expect(container.querySelector(tableCls).classList).not.toContain('clickable')
  })

  it('should render empty data row', () => {
    expect(container.querySelector(emptyDataRowCls).hidden).toBeFalse()
    expect(container.querySelector(emptyDataCellCls).getAttribute('colspan')).toEqual('2')
    expect(container.querySelector(processingRowCls).hidden).toBeTrue()
    expect(container.querySelector('.mat-row')).toBeFalsy()
  })

  it('should render processing row', () => {
    updateStoreAndFixture(store, {
      ...initialState,
      cardsList: {
        ...initialState.cardsList,
        list: {
          ...initialState.cardsList.list,
          isProcessing: true
        }
      }
    }, fixture)

    expect(container.querySelector(emptyDataRowCls).hidden).toBeTrue()
    expect(container.querySelector(processingRowCls).hidden).toBeFalse()
    expect(container.querySelector(processingCellCls).getAttribute('colspan')).toEqual('2')
    expect(container.querySelector('.mat-row')).toBeFalsy()
  })

  it('should render data rows', () => {
    updateStoreAndFixture(store, {
      ...initialState,
      cardsList: {
        ...initialState.cardsList,
        list: {
          ...initialState.cardsList.list,
          data: MOCK_CARDS
        }
      }
    }, fixture)

    expect(fixture.componentInstance.offsetAndLimit).toEqual({ offset: 0, limit: 20 })
    expect(container.querySelector(emptyDataRowCls).hidden).toBeTrue()
    expect(container.querySelector(processingRowCls).hidden).toBeTrue()
    expect(container.querySelectorAll('.mat-row').length).toEqual(MOCK_CARDS.items.length)
    expect(container.querySelector(paginatorCls).getAttribute('ng-reflect-length')).toEqual(`${MOCK_CARDS.total}`)

    fireEvent.click(container.querySelector('.mat-paginator-navigation-next'))
    expect(fixture.componentInstance.offsetAndLimit).toEqual({ offset: 20, limit: 20 })
  })
})

@Component({
  template: `
    <paginated-table 
      [storeSelector]="storeSelector"
      [isPaginable]="isPaginable"
      [isClickable]="isClickable"
      (paginationChange)="onPaginationChange($event)">

      <mat-header-row *matHeaderRowDef="displayedColumns; sticky:true"></mat-header-row>

      <mat-row *matRowDef="let item; columns: displayedColumns"></mat-row>

      <ng-container matColumnDef="eaid">
        <mat-header-cell *matHeaderCellDef>EAID</mat-header-cell>
        <mat-cell *matCellDef="let item">{{item.eaid}}</mat-cell>
      </ng-container>

      <ng-container matColumnDef="status">
        <mat-header-cell *matHeaderCellDef>Status</mat-header-cell>
        <mat-cell *matCellDef="let item">{{item.status}}</mat-cell>
      </ng-container>

    </paginated-table>
  `
})
class TestComponent {
  @Input()
    storeSelector = 'cardsList.list'

  @Input()
    displayedColumns = ['eaid', 'status']

  @Input()
    isPaginable = true

  @Input()
    isClickable = true

  offsetAndLimit?: OffsetAndLimit

  onPaginationChange(offsetAndLimit: OffsetAndLimit): void {
    this.offsetAndLimit = offsetAndLimit
  }
}
