import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { CustomValidators } from '@narik/custom-validators'
import { Observable } from 'rxjs'

import { FeatureState } from '../../ngrx/cards-list.reducer'
import { CardsListActionTypes, ReplaceCardEaid } from '../../ngrx/cards-list.actions'

@UntilDestroy()
@Component({
  selector: 'replace-card-eaid-dialog',
  templateUrl: './replace-card-eaid-dialog.component.html'
})
export class CardsListReplaceCardEaidDialogComponent implements OnInit {
  form!: FormGroup

  get eaid(): FormControl { return this.form.get('eaid') as FormControl }

  isProcessing$!: Observable<boolean>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { card: any },
    private _dialogRef: MatDialogRef<CardsListReplaceCardEaidDialogComponent>,
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
    this._store.dispatch(new ReplaceCardEaid(this.data.card.eaid, this.form.value))
  }

  private _createForm(): void {
    this.form = this._formBuilder.group({
      eaid: ['', [Validators.required, CustomValidators.number, Validators.minLength(16), Validators.maxLength(16)]]
    })
  }

  private _initObservables(): void {
    this.isProcessing$ = this._store
      .select(s => s.cardsList.replaceCardEaid.isProcessing)
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
        CardsListActionTypes.ReplaceCardEaidSuccess
      ),
      untilDestroyed(this)
    ).subscribe(() => this._dialogRef.close())
  }
}
