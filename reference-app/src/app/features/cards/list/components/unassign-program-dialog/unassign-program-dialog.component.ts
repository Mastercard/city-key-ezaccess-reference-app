import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Observable } from 'rxjs'

import { FeatureState } from '../../ngrx/cards-list.reducer'
import { UnassignProgram, CardsListActionTypes } from '../../ngrx/cards-list.actions'

@UntilDestroy()
@Component({
  selector: 'unassign-program-dialog',
  templateUrl: './unassign-program-dialog.component.html'
})
export class CardsListUnassignProgramDialogComponent implements OnInit {
  isProcessing$!: Observable<boolean>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { card: any, programId: string },
    private _dialogRef: MatDialogRef<CardsListUnassignProgramDialogComponent>,
    private _store: Store<FeatureState>,
    private _actions: Actions
  ) { }

  ngOnInit(): void {
    this._initObservables()
    this._checkSuccessToCloseDialog()
  }

  onSubmit(): void {
    this._store.dispatch(new UnassignProgram(this.data.programId, this.data.card.eaid))
  }

  private _initObservables(): void {
    this.isProcessing$ = this._store
      .select(s => s.cardsList.unassignProgram.isProcessing)
      .pipe(untilDestroyed(this))
  }

  private _checkSuccessToCloseDialog(): void {
    this._actions.pipe(
      ofType(
        CardsListActionTypes.UnassignProgramSuccess
      ),
      untilDestroyed(this)
    ).subscribe(() => this._dialogRef.close())
  }
}
