import {
  AfterViewInit, Component, ContentChildren,
  EventEmitter, Input, OnInit, Output, QueryList, ViewChild
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatColumnDef, MatFooterRowDef, MatHeaderRowDef, MatRowDef, MatTable } from '@angular/material/table'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import get from 'lodash-es/get'
import { getSpringDataItems, getSpringDataTotalLength, trackById } from 'ngx-mclabs-utils'

import { getOffsetAndLimit } from 'app/shared/utils'
import { OffsetAndLimit } from 'app/shared/constants'

@UntilDestroy()
@Component({
  selector: 'paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.scss']
})
export class PaginatedTableComponent<T> implements OnInit, AfterViewInit {
  readonly trackByFn = trackById

  @ViewChild(MatTable)
    table!: MatTable<T>

  @ViewChild(MatPaginator)
    paginator!: MatPaginator

  @ContentChildren(MatColumnDef, { descendants: false })
    columnDefs!: QueryList<MatColumnDef>

  @ContentChildren(MatRowDef, { descendants: false })
    rowDefs!: QueryList<MatRowDef<T>>

  @ContentChildren(MatHeaderRowDef, { descendants: false })
    headerRowDefs!: QueryList<MatHeaderRowDef>

  @ContentChildren(MatFooterRowDef, { descendants: false })
    footerRowDefs!: QueryList<MatFooterRowDef>

  @Input()
    isPaginable = true

  @Input()
    isClickable = true

  @Input()
    storeSelector!: string

  @Input()
  itemsKey = 'items'

  @Output()
  paginationChange = new EventEmitter<OffsetAndLimit>()

  private get _storeSelectorArr(): string[] { return this.storeSelector.split('.') }

  dataSource$!: Observable<unknown[]>
  dataTotalLength$!: Observable<number>
  isProcessing$!: Observable<boolean>

  constructor(private _store: Store<any>) { }

  ngOnInit(): void {
    const data$ = this._store.select(s => get(s, [...this._storeSelectorArr, 'data'], {}))
    this.dataSource$ = data$.pipe(
      getSpringDataItems({ itemsKey: this.itemsKey }),
      untilDestroyed(this)
    )
    this.dataTotalLength$ = data$.pipe(
      getSpringDataTotalLength({ totalElementsKey: 'total' }),
      untilDestroyed(this)
    )

    this.isProcessing$ = this._store
      .select(s => get(s, [...this._storeSelectorArr, 'isProcessing'], true))
      .pipe(untilDestroyed(this))
  }

  ngAfterViewInit(): void {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef))
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef))
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef))
    this.footerRowDefs.forEach(footerRowDef => this.table.addFooterRowDef(footerRowDef))

    if (this.isPaginable) {
      setTimeout(() => {
        this._emitPageNumberAndSize()
        this.paginator.page.subscribe(this._emitPageNumberAndSize)
      })
    }
  }

  private _emitPageNumberAndSize = (): void => {
    const { offset, limit } = getOffsetAndLimit(this.paginator)
    this.paginationChange.emit({ offset, limit })
  }
}
