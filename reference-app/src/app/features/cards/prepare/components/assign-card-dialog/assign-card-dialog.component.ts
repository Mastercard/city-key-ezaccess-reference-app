import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { CustomValidators } from '@narik/custom-validators'

@Component({
  selector: 'assign-card-dialog',
  templateUrl: './assign-card-dialog.component.html'
})
export class CardsPrepareAssignCardDialogComponent implements OnInit {
  form!: FormGroup

  get last4Digits(): FormControl { return this.form.get('last4Digits') as FormControl }

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<CardsPrepareAssignCardDialogComponent>
  ) { }

  ngOnInit(): void {
    this._createForm()
  }

  onSubmit(): void {
    this._dialogRef.close(this.last4Digits.value)
  }

  private _createForm(): void {
    this.form = this._formBuilder.group({
      last4Digits: ['', [Validators.required, CustomValidators.number, Validators.minLength(4), Validators.maxLength(4)]]
    })
  }
}
