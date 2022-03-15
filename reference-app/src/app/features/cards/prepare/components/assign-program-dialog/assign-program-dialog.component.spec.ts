import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatDialogRef } from '@angular/material/dialog'
import { provideMockStore } from '@ngrx/store/testing'
import { fireEvent, render, RenderComponentOptions } from '@testing-library/angular'
import { SinonStub, stub } from 'sinon'

import { SharedModule } from 'app/shared/modules/shared.module'
import { clickMatSelect, selectMatOptionByLabel } from 'app/shared/testing/material.testUtils'
import { MOCK_PROGRAMS } from 'app/shared/testing/mock-objects'
import { ALL_INITIAL_STATE } from 'app/shared/testing/types.testUtils'

import { CardsPrepareAssignProgramDialogComponent } from './assign-program-dialog.component'

const cls = '.cards-prepare-assign-program-dialog'
const formCls = `${cls}-form`
const formProgramIdCls = `${formCls}-programId`
const submitBtnCls = `${cls}-submit-btn`
const cdkOverlayContainerCls = '.cdk-overlay-container'
const matOptionSel = 'mat-option'
const ngReflectValueAttr = 'ng-reflect-value'

describe(CardsPrepareAssignProgramDialogComponent.name, () => {
  const { id: programId, name: programName } = MOCK_PROGRAMS.items[0]

  const imports = [
    MatFormFieldModule,
    MatSelectModule,
    SharedModule
  ]

  const initialState = {
    ...ALL_INITIAL_STATE,
    resource: {
      ...ALL_INITIAL_STATE.resource,
      programsRes: {
        ...ALL_INITIAL_STATE.resource.programsRes,
        data: MOCK_PROGRAMS
      }
    }
  }

  let stubClose: SinonStub
  let mockDialogRefProvider

  let providers: unknown[]

  let renderOptions: RenderComponentOptions<CardsPrepareAssignProgramDialogComponent>

  let container: any
  let fixture: ComponentFixture<CardsPrepareAssignProgramDialogComponent>

  beforeEach(async () => {
    stubClose = stub()
    mockDialogRefProvider = {
      provide: MatDialogRef,
      useValue: { close: stubClose }
    }

    providers = [
      provideMockStore({ initialState }),
      mockDialogRefProvider
    ]

    renderOptions = {
      imports,
      providers,
      schemas: [NO_ERRORS_SCHEMA]
    }

    TestBed.resetTestingModule();
    ({ container, fixture } = await render(CardsPrepareAssignProgramDialogComponent, renderOptions))
  })

  it('should show program select options', () => {
    clickMatSelect(container.querySelector(formProgramIdCls))
    const matOptions = document.querySelector(cdkOverlayContainerCls)?.querySelectorAll(matOptionSel)
    expect(matOptions!.length).toEqual(MOCK_PROGRAMS.items.length)
    matOptions!.forEach((el: any, i) => {
      expect(el.innerText).toEqual(MOCK_PROGRAMS.items[i].name)
      expect(el.getAttribute(ngReflectValueAttr)).toEqual(MOCK_PROGRAMS.items[i].id)
    })
  })

  it('should disable Submit button when field is empty', async () => {
    expect(container.querySelector(submitBtnCls).disabled).toBeTrue()
    clickMatSelect(container.querySelector(formProgramIdCls))
    selectMatOptionByLabel(programName)
    await fixture.whenStable()
    expect(container.querySelector(submitBtnCls).disabled).toBeFalse()
  })

  it('should return dialog result when clicking Submit button', async () => {
    clickMatSelect(container.querySelector(formProgramIdCls))
    selectMatOptionByLabel(programName)
    await fixture.whenStable()
    fireEvent.click(container.querySelector(submitBtnCls))
    expect(stubClose.lastCall.args).toEqual([programId])
  })
})
