import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { OffsetAndLimit } from 'app/shared/constants'

import { FeatureState } from './ngrx/programs-list.reducer'
import { GetPrograms, Reset } from './ngrx/programs-list.actions'

@Component({
  selector: 'programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit, OnDestroy {
  readonly storeSelector = 'programsList.list'

  get displayedColumns(): string[] {
    return ['id', 'name']
  }

  private _pageNumberAndSize!: OffsetAndLimit

  constructor(
    private _store: Store<FeatureState>
  ) { }

  ngOnInit(): void {
    this._loadData()
  }

  ngOnDestroy(): void {
    this._store.dispatch(new Reset())
  }

  onPaginationChange(pageNumberAndSize: OffsetAndLimit): void {
    this._pageNumberAndSize = pageNumberAndSize
    this._loadData()
  }

  private _loadData(): void {
    this._store.dispatch(new GetPrograms({ ...this._pageNumberAndSize }))
  }
}
