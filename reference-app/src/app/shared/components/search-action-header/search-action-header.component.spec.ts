import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { render } from '@testing-library/angular'

import { Breadcrumb, BreadcrumbService } from 'app/shared/services/breadcrumb.service'

import { SearchActionHeaderComponent } from './search-action-header.component'

const cls = '.search-action-header'
const titleCls = `${cls}-title`
const backBtnCls = `${cls}-back-btn`

describe(SearchActionHeaderComponent.name, () => {
  const title = 'title'

  let container: any

  async function rerender(breadcrumbs: Breadcrumb[]) {
    TestBed.resetTestingModule();

    ({ container } = await render(SearchActionHeaderComponent, {
      routes: [],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: { title },
      providers: [
        { provide: BreadcrumbService, useValue: { breadcrumbs } }
      ]
    }))
  }

  it('should render title', async () => {
    await rerender([])
    expect(container.querySelector(titleCls).innerText).toEqual(title)
    expect(container.querySelector(backBtnCls)).toBeFalsy()
  })

  it('should show back button for child page', async () => {
    await rerender([
      { label: 'Cards', path: '/cards' },
      { label: 'Add Cards', path: '/cards/prepare' }
    ])
    expect(container.querySelector(backBtnCls)).toBeTruthy()
  })
})
