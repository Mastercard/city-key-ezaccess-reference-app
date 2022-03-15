import { NO_ERRORS_SCHEMA } from '@angular/core'
import { render, RenderComponentOptions } from '@testing-library/angular'

import { SharedModule } from 'app/shared/modules/shared.module'

import { BottomBarComponent } from './bottom-bar.component'

describe(BottomBarComponent.name, () => {
  const imports = [SharedModule]

  let renderOptions: RenderComponentOptions<BottomBarComponent>

  let container: any

  beforeEach(async () => {
    renderOptions = {
      imports,
      schemas: [NO_ERRORS_SCHEMA]
    };

    ({ container } = await render(BottomBarComponent, renderOptions))
  })

  it('should render', () => {
    expect(container).toBeTruthy()
  })
})
