import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { SelectionModel } from '@angular/cdk/collections'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { CustomValidators } from '@narik/custom-validators'
import { BehaviorSubject, merge, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import isEmpty from 'lodash-es/isEmpty'
import groupBy from 'lodash-es/groupBy'
import { parse } from 'papaparse'

import { CreateEaids, CardsPrepareActionTypes, RegisterCards, Reset } from './ngrx/cards-prepare.actions'
import { FeatureState } from './ngrx/cards-prepare.reducer'
import { CardsPrepareAssignProgramDialogComponent } from './components/assign-program-dialog/assign-program-dialog.component'
import { CardsPrepareAssignCardDialogComponent } from './components/assign-card-dialog/assign-card-dialog.component'

@UntilDestroy()
@Component({
  selector: 'cards-prepare',
  templateUrl: './cards-prepare.component.html',
  styleUrls: ['./cards-prepare.component.scss']
})
export class CardsPrepareComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('fileInput')
    fileInput!: ElementRef

  @ViewChild(MatPaginator)
    paginator!: MatPaginator

  selectedTabIdx = 0

  get columns(): string[] {
    return this.selectedTabIdx === 0
      ? ['eaid', 'programId', 'last4Digits']
      : ['check', 'eaid', 'programId', 'last4Digits']
  }

  selection!: SelectionModel<any>

  get isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.tableEaids.data.length
    return numSelected === numRows
  }

  get hasValidEntries(): boolean {
    return !isEmpty(this.validEntries)
  }

  get validEntries(): any[] {
    return this.tableEaids.data.filter(row => Object.keys(row).every(key => !isEmpty(row[key])))
  }

  form!: FormGroup

  get rangeId(): FormControl { return this.form.get('rangeId') as FormControl }
  get startNumber(): FormControl { return this.form.get('startNumber') as FormControl }
  get endNumber(): FormControl { return this.form.get('endNumber') as FormControl }
  get showUnused(): FormControl { return this.form.get('showUnused') as FormControl }

  isCreateEaidsProcessing$!: Observable<boolean>
  isRegisterCardsProcessing$!: Observable<boolean>

  private _originalCreatedEaids$ = new BehaviorSubject<any[]>([])
  get originalCreatedEaids(): any[] { return this._originalCreatedEaids$.value }

  private _uploadedEaids$ = new BehaviorSubject<any[]>([])

  tableEaids!: MatTableDataSource<any>

  encodedCsv?: string

  fileName = ''

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private _store: Store<FeatureState>,
    private _actions: Actions
  ) { }

  ngOnInit(): void {
    this._createForm()
    this._createSelection()
    this._initObservables()
    this._checkSuccessToNavigate()
  }

  ngAfterViewInit(): void {
    this.tableEaids.paginator = this.paginator
  }

  ngOnDestroy(): void {
    this._store.dispatch(new Reset())
  }

  onSubmit(): void {
    this._store.dispatch(new CreateEaids(this.form.value))
  }

  onFileChange(event: any): void {
    if (!isEmpty(event.target.files)) {
      const file = event.target.files[0]
      this.fileName = file.name
      parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: results => {
          const { data } = results
          this._uploadedEaids$.next((data as any[]).map(({ eaid, ...rest }) =>
            ({ eaid: eaid.startsWith('\'') ? eaid.substring(1) : eaid, ...rest })
          ))
        }
      })
    }
  }

  onTabSelectedIndexChange(i: number): void {
    this.selectedTabIdx = i
  }

  onAddCardsBtnClick(): void {
    const data = groupBy(this.validEntries, 'programId')
    Object.keys(data).forEach(programId => {
      const body = {
        programIds: [programId],
        cards: data[programId].map(({ eaid, last4Digits }) => ({ eaid, last4Digits: +last4Digits }))
      }

      this._store.dispatch(new RegisterCards(body))
    })
  }

  onAssignProgramBtnClick(): void {
    const dialogRef = this._matDialog.open(CardsPrepareAssignProgramDialogComponent, {
      panelClass: 'dialog-md'
    })

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        if (!isEmpty(result)) {
          this.selection.selected.forEach(x => x.programId = result)
          this.tableEaids.data = [...this.tableEaids.data]
        }
      })
  }

  onAssignCardBtnClick(event: any, row: any): void {
    event.preventDefault()

    const dialogRef = this._matDialog.open(CardsPrepareAssignCardDialogComponent, {
      panelClass: 'dialog-md'
    })

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        if (!isEmpty(result)) {
          row.last4Digits = result
          this.tableEaids.data = [...this.tableEaids.data]
        }
      })
  }

  allSelectionsToggle(): any {
    this.isAllSelected
      ? this.selection.clear()
      : this.tableEaids.data.forEach(row => this.selection.select(row))
  }

  private _createForm(): void {
    this.form = this._formBuilder.group({
      rangeId: [1, [Validators.required, CustomValidators.number, CustomValidators.min(1), CustomValidators.max(500)]],
      startNumber: [1, [Validators.required, CustomValidators.number, CustomValidators.min(1), CustomValidators.max(500)]],
      endNumber: [20, [Validators.required, CustomValidators.number, CustomValidators.min(1), CustomValidators.max(500)]],
      showUnused: [true]
    })
  }

  private _createSelection(): void {
    this.selection = new SelectionModel<any>(true, [])
  }

  private _initObservables(): void {
    this.isCreateEaidsProcessing$ = this._store
      .select(s => s.cardsPrepare.createEaids.isProcessing)
      .pipe(untilDestroyed(this))

    this.isCreateEaidsProcessing$
      .pipe(untilDestroyed(this))
      .subscribe(isProcessing => {
        if (isProcessing) {
          this.form.disable()
        } else {
          this.form.enable()
        }
      })

    this.isRegisterCardsProcessing$ = this._store
      .select(s => s.cardsPrepare.registerCards.isProcessing)
      .pipe(untilDestroyed(this))

    this._store
      .select(s => s.cardsPrepare.createEaids.data)
      .pipe(
        map(data => {
          if (data?.eaids) {
            return data.eaids.map((eaid: any) => ({ eaid, programId: null, last4Digits: null }))
          }
          return []
        }),
        untilDestroyed(this)
      )
      .subscribe(this._originalCreatedEaids$)

    this._originalCreatedEaids$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.encodedCsv = this._encodeCsv()
        this.fileName = ''
        if (this.fileInput) {
          this.fileInput.nativeElement.value = ''
        }
      })

    this.tableEaids = new MatTableDataSource()
    merge(
      this._originalCreatedEaids$,
      this._uploadedEaids$
    )
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        this.tableEaids.data = data
      })
  }

  private _checkSuccessToNavigate(): void {
    this._actions.pipe(
      ofType(
        CardsPrepareActionTypes.RegisterCardsSuccess
      ),
      untilDestroyed(this)
    ).subscribe(() => this._router.navigate(['/cards']))
  }

  private _encodeCsv(): string {
    if (isEmpty(this.originalCreatedEaids)) return ''
    const csvArr = [['eaid', 'programId', 'last4Digits']]
    this.originalCreatedEaids.forEach(({ eaid }) => {
      csvArr.push([`'${eaid}`, '<some programId>', '<some last4Digits>'])
    })
    return `data:text/csv;charset=utf-8,${csvArr.map(r => r.join(',')).join('\n')}`
  }
}
