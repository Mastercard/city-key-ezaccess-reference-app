import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

import { OffsetAndLimit } from 'app/shared/constants'

import { FeatureState } from '../../ngrx/programs-detail.reducer'
import { GetCards, ProgramsDetailActionTypes } from '../../ngrx/programs-detail.actions'
import { ProgramsDetailUnassignCardDialogComponent } from '../unassign-card-dialog/unassign-card-dialog.component'

@UntilDestroy()
@Component({
  selector: 'cards-tab',
  templateUrl: './cards-tab.component.html'
})
export class ProgramsDetailCardsTabComponent implements OnInit {
  readonly storeSelector = 'programsDetail.listCards'

  get displayedColumns(): string[] {
    return ['eaid', 'last4Digits', 'actions']
  }

  get programId(): string { return this._route.snapshot.params.programId }

  private _pageNumberAndSize!: OffsetAndLimit

  constructor(
    private _route: ActivatedRoute,
    private _matDialog: MatDialog,
    private _store: Store<FeatureState>,
    private _actions: Actions
  ) { }

  ngOnInit(): void {
    this._checkSuccessToReloadData()
  }

  onPaginationChange(pageNumberAndSize: OffsetAndLimit): void {
    this._pageNumberAndSize = pageNumberAndSize
    this._loadData()
  }

  onUnassignCardBtnClick(card: unknown): void {
    this._matDialog.open(ProgramsDetailUnassignCardDialogComponent, {
      panelClass: 'dialog-md',
      data: { card, programId: this.programId }
    })
  }

  private _loadData(): void {
    this._store.dispatch(new GetCards(this.programId, { ...this._pageNumberAndSize }))
  }

  private _checkSuccessToReloadData(): void {
    this._actions
      .pipe(
        ofType(
          ProgramsDetailActionTypes.UnassignCardSuccess
        ),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this._loadData()
      })
  }
}
