import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { BehaviorSubject } from 'rxjs'

import { CardStatusType, OffsetAndLimit } from 'app/shared/constants'

import { CardsListActionTypes, GetCards, Reset } from './ngrx/cards-list.actions'
import { FeatureState } from './ngrx/cards-list.reducer'
import { CardsListReplaceCardEaidDialogComponent } from './components/replace-card-eaid-dialog/replace-card-eaid-dialog.component'
import { CardsListAssignProgramDialogComponent } from './components/assign-program-dialog/assign-program-dialog.component'
import { CardsListUnassignProgramDialogComponent } from './components/unassign-program-dialog/unassign-program-dialog.component'
import { CardsListChangeCardStatusDialogComponent } from './components/change-card-status-dialog/change-card-status-dialog.component'

@UntilDestroy()
@Component({
  selector: 'cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit, OnDestroy {
  readonly cardStatusType = CardStatusType
  readonly storeSelector = 'cardsList.list'

  get displayedColumns(): string[] {
    return ['eaid', 'last4Digits', 'programIds', 'status', 'actions']
  }

  private _pageNumberAndSize!: OffsetAndLimit

  private _cardsListData$ = new BehaviorSubject<any>({})
  private get _cards(): any[] { return this._cardsListData$.value?.cards ?? [] }

  constructor(
    private _matDialog: MatDialog,
    private _store: Store<FeatureState>,
    private _actions: Actions
  ) { }

  ngOnInit(): void {
    this._initObservables()
    this._checkSuccessToReloadData()
  }

  ngOnDestroy(): void {
    this._store.dispatch(new Reset())
  }

  onPaginationChange(pageNumberAndSize: OffsetAndLimit): void {
    this._pageNumberAndSize = pageNumberAndSize
    this._loadData()
  }

  onChangeCardStatusBtnClick(card: unknown): void {
    this._matDialog.open(CardsListChangeCardStatusDialogComponent, {
      panelClass: 'dialog-md',
      data: { card }
    })
  }

  onReplaceCardEaidBtnClick(card: any): void {
    this._matDialog.open(CardsListReplaceCardEaidDialogComponent, {
      panelClass: 'dialog-md',
      data: { card }
    })
  }

  onAssignProgramBtnClick(card: any): void {
    this._matDialog.open(CardsListAssignProgramDialogComponent, {
      panelClass: 'dialog-md',
      data: { card }
    })
  }

  onUnassignProgramBtnClick(card: any, programId: string): void {
    this._matDialog.open(CardsListUnassignProgramDialogComponent, {
      panelClass: 'dialog-md',
      data: { card, programId }
    })
  }

  private _initObservables(): void {
    this._store
      .select(s => s.cardsList.list.data)
      .pipe(untilDestroyed(this))
      .subscribe(this._cardsListData$)
  }

  private _loadData(): void {
    this._store.dispatch(new GetCards({ ...this._pageNumberAndSize }))
  }

  private _checkSuccessToReloadData(): void {
    this._actions
      .pipe(
        ofType(
          CardsListActionTypes.AssignProgramSuccess,
          CardsListActionTypes.ChangeCardStatusSuccess,
          CardsListActionTypes.ReplaceCardEaidSuccess,
          CardsListActionTypes.UnassignProgramSuccess
        ),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this._loadData()
      })
  }
}
