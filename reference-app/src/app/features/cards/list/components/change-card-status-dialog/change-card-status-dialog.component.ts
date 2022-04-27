import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Observable } from 'rxjs'

import { CardStatusType } from 'app/shared/constants'

import { FeatureState } from '../../ngrx/cards-list.reducer'
import { ChangeCardStatus, CardsListActionTypes } from '../../ngrx/cards-list.actions'

@UntilDestroy()
@Component({
  selector: 'change-card-status-dialog',
  templateUrl: './change-card-status-dialog.component.html'
})
export class CardsListChangeCardStatusDialogComponent implements OnInit {
  get actionName(): string { return this.data.card.status === CardStatusType.ACTIVE ? 'Block' : 'Unblock' }

  isProcessing$!: Observable<boolean>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { card: any },
    private _dialogRef: MatDialogRef<CardsListChangeCardStatusDialogComponent>,
    private _store: Store<FeatureState>,
    private _actions: Actions
  ) { }

  ngOnInit(): void {
    this._initObservables()
    this._checkSuccessToCloseDialog()
  }

  onSubmit(): void {
    this._store.dispatch(new ChangeCardStatus(this.data.card.eaid, {
      status: this.data.card.status === CardStatusType.ACTIVE ? CardStatusType.BLOCKED : CardStatusType.ACTIVE
    }))
  }

  private _initObservables(): void {
    this.isProcessing$ = this._store
      .select(s => s.cardsList.changeCardStatus.isProcessing)
      .pipe(untilDestroyed(this))
  }

  private _checkSuccessToCloseDialog(): void {
    this._actions.pipe(
      ofType(
        CardsListActionTypes.ChangeCardStatusSuccess
      ),
      untilDestroyed(this)
    ).subscribe(() => this._dialogRef.close())
  }
}
