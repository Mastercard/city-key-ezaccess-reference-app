import { Component, ViewChild } from '@angular/core'
import { MatOption } from '@angular/material/core'
import { MatDialogRef } from '@angular/material/dialog'
import { MatSelect } from '@angular/material/select'
import { trackById } from 'ngx-mclabs-utils'

@Component({
  selector: 'assign-program-dialog',
  templateUrl: './assign-program-dialog.component.html'
})
export class CardsPrepareAssignProgramDialogComponent {
  readonly trackByFn = trackById

  @ViewChild(MatSelect)
    programsSelect!: MatSelect

  get shouldDisableSubmitBtn(): boolean {
    return this.programsSelect ? this.programsSelect.empty : true
  }

  constructor(
    private _dialogRef: MatDialogRef<CardsPrepareAssignProgramDialogComponent>
  ) { }

  onSubmit(): void {
    this._dialogRef.close((this.programsSelect.selected as MatOption).value)
  }
}
