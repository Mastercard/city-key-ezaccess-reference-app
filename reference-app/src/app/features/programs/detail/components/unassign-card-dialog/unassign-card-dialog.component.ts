import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Observable } from 'rxjs'

import { FeatureState } from '../../ngrx/programs-detail.reducer'
import { UnassignCard, ProgramsDetailActionTypes } from '../../ngrx/programs-detail.actions'

@UntilDestroy()
@Component({
  selector: 'unassign-card-dialog',
  templateUrl: './unassign-card-dialog.component.html'
})
export class ProgramsDetailUnassignCardDialogComponent implements OnInit {
  isProcessing$!: Observable<boolean>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { card: any, programId: string },
    private _dialogRef: MatDialogRef<ProgramsDetailUnassignCardDialogComponent>,
    private _store: Store<FeatureState>,
    private _actions: Actions
  ) { }

  ngOnInit(): void {
    this._initObservables()
    this._checkSuccessToCloseDialog()
  }

  onSubmit(): void {
    this._store.dispatch(new UnassignCard(this.data.programId, this.data.card.eaid))
  }

  private _initObservables(): void {
    this.isProcessing$ = this._store
      .select(s => s.programsDetail.unassignCard.isProcessing)
      .pipe(untilDestroyed(this))
  }

  private _checkSuccessToCloseDialog(): void {
    this._actions.pipe(
      ofType(
        ProgramsDetailActionTypes.UnassignCardSuccess
      ),
      untilDestroyed(this)
    ).subscribe(() => this._dialogRef.close())
  }
}
