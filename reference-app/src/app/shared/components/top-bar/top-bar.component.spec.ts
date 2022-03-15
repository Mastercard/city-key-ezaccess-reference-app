import { NO_ERRORS_SCHEMA } from '@angular/core'
import { render, RenderComponentOptions } from '@testing-library/angular'

import { SharedModule } from 'app/shared/modules/shared.module'
import { MockComponent } from 'app/shared/testing/mock.component'

import { TopBarComponent } from './top-bar.component'

const cls = '.top-bar'
const navItemCls = `${cls}-navigation-item`
const navItemLinkCls = `${navItemCls}-link`

describe(TopBarComponent.name, () => {
  const imports = [SharedModule]

  const routes = [{
    path: 'cards',
    pathMatch: 'full',
    component: MockComponent
  }]

  let renderOptions: RenderComponentOptions<TopBarComponent>

  let container: any
  let navigate: any

  beforeEach(async () => {
    renderOptions = {
      imports,
      routes,
      schemas: [NO_ERRORS_SCHEMA]
    };

    ({ container, navigate } = await render(TopBarComponent, renderOptions))
  })

  it('should render navigations', () => {
    expect(container.querySelectorAll(navItemCls).length).toEqual(2)
  })

  it('should highlight the current navigation item', async () => {
    await navigate('/cards')
    expect(container.querySelectorAll(`${navItemLinkCls}.active`).length).toEqual(1)
    expect(container.querySelector(`${navItemLinkCls}.active`).innerText).toEqual('Cards')
  })
})
