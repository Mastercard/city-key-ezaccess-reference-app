import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Observable } from 'rxjs'
import { trackById } from 'ngx-mclabs-utils'

import { FeatureState } from '../../ngrx/cards-list.reducer'
import { AssignProgram, CardsListActionTypes } from '../../ngrx/cards-list.actions'

@UntilDestroy()
@Component({
  selector: 'assign-program-dialog',
  templateUrl: './assign-program-dialog.component.html'
})
export class CardsListAssignProgramDialogComponent implements OnInit {
  readonly trackByFn = trackById

  form!: FormGroup

  get programId(): FormControl { return this.form.get('programId') as FormControl }

  isProcessing$!: Observable<boolean>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { card: any },
    private _dialogRef: MatDialogRef<CardsListAssignProgramDialogComponent>,
    private _formBuilder: FormBuilder,
    private _store: Store<FeatureState>,
    private _actions: Actions
  ) { }

  ngOnInit(): void {
    this._createForm()
    this._initObservables()
    this._checkSuccessToCloseDialog()
  }

  onSubmit(): void {
    this._store.dispatch(new AssignProgram(this.programId.value, { eaid: this.data.card.eaid }))
  }

  private _createForm(): void {
    this.form = this._formBuilder.group({
      programId: ['']
    })
  }

  private _initObservables(): void {
    this.isProcessing$ = this._store
      .select(s => s.cardsList.assignProgram.isProcessing)
      .pipe(untilDestroyed(this))

    this.isProcessing$
      .pipe(untilDestroyed(this))
      .subscribe(isProcessing => {
        if (isProcessing) {
          this.form.disable()
        } else {
          this.form.enable()
        }
      })
  }

  private _checkSuccessToCloseDialog(): void {
    this._actions.pipe(
      ofType(
        CardsListActionTypes.AssignProgramSuccess
      ),
      untilDestroyed(this)
    ).subscribe(() => this._dialogRef.close())
  }
}
