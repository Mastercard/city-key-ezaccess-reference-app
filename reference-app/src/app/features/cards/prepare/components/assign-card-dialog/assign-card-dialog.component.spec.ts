import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDialogRef } from '@angular/material/dialog'
import { fireEvent, render, RenderComponentOptions } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { SinonStub, stub } from 'sinon'

import { SharedModule } from 'app/shared/modules/shared.module'

import { CardsPrepareAssignCardDialogComponent } from './assign-card-dialog.component'

const cls = '.cards-prepare-assign-card-dialog'
const formCls = `${cls}-form`
const formLast4DigitsCls = `${formCls}-last4Digits`
const submitBtnCls = `${cls}-submit-btn`

describe(CardsPrepareAssignCardDialogComponent.name, () => {
  const last4Digits = '4444'

  const imports = [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]

  let stubClose: SinonStub
  let mockDialogRefProvider

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<CardsPrepareAssignCardDialogComponent>

  let container: any

  beforeEach(async () => {
    stubClose = stub()
    mockDialogRefProvider = {
      provide: MatDialogRef,
      useValue: { close: stubClose }
    }

    providers = [
      mockDialogRefProvider
    ]

    renderOptions = {
      imports,
      providers,
      schemas: [NO_ERRORS_SCHEMA]
    }

    TestBed.resetTestingModule();
    ({ container } = await render(CardsPrepareAssignCardDialogComponent, renderOptions))
  })

  it('should disable Submit button when field is empty', () => {
    expect(container.querySelector(submitBtnCls).disabled).toBeTrue()
    userEvent.type(container.querySelector(formLast4DigitsCls).querySelector('input'), last4Digits)
    expect(container.querySelector(submitBtnCls).disabled).toBeFalse()
  })

  it('should return dialog result when clicking Submit button', () => {
    userEvent.type(container.querySelector(formLast4DigitsCls).querySelector('input'), last4Digits)
    fireEvent.click(container.querySelector(submitBtnCls))
    expect(stubClose.lastCall.args).toEqual([last4Digits])
  })
})
