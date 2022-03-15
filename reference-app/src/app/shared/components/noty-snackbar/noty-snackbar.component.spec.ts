import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'
import { render } from '@testing-library/angular'

import { ToastrType } from 'app/shared/constants'
import { SharedModule } from 'app/shared/modules/shared.module'

import { NotySnackbarComponent } from './noty-snackbar.component'

const cls = '.noty-snackbar'
const iconCls = `${cls}-icon`
const messageCls = `${cls}-message`

describe(NotySnackbarComponent.name, () => {
  const message = 'message'

  const imports = [SharedModule]

  let container: any

  async function rerender(type: ToastrType): Promise<void> {
    TestBed.resetTestingModule();

    ({ container } = await render(NotySnackbarComponent, {
      imports,
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: { message, type }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }))
  }

  it('should render snackbar content based on type', async () => {
    await rerender('success')
    expect(container.querySelector(messageCls).innerText).toEqual(message)
    expect(container.querySelector(iconCls).innerText).toEqual('check_circle')
    expect(container.querySelector(iconCls).classList).toContain('text-accent')

    await rerender('error')
    expect(container.querySelector(iconCls).innerText).toEqual('cancel')
    expect(container.querySelector(iconCls).classList).toContain('text-warn')

    await rerender('warn')
    expect(container.querySelector(iconCls).innerText).toEqual('error_outline')
    expect(container.querySelector(iconCls).classList).toContain('text-warn')

    await rerender('info')
    expect(container.querySelector(iconCls).innerText).toEqual('info')
    expect(container.querySelector(iconCls).classList).toContain('text-primary')
  })
})
