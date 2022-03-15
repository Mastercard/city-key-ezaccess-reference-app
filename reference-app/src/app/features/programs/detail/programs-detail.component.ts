import { Component, OnDestroy, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { Store } from '@ngrx/store'

import { FeatureState } from './ngrx/programs-detail.reducer'
import { Reset } from './ngrx/programs-detail.actions'

@Component({
  selector: 'programs-detail',
  templateUrl: './programs-detail.component.html',
  styleUrls: ['./programs-detail.component.scss']
})
export class ProgramsDetailComponent implements OnInit, OnDestroy {
  program!: any

  constructor(
    private _location: Location,
    private _store: Store<FeatureState>
  ) { }

  ngOnInit(): void {
    this.program = (this._location.getState() as any)?.program
  }

  ngOnDestroy(): void {
    this._store.dispatch(new Reset())
  }
}
