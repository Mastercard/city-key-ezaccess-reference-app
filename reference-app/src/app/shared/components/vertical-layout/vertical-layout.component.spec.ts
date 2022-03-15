import { NO_ERRORS_SCHEMA } from '@angular/core'
import { render } from '@testing-library/angular'

import { VerticalLayoutComponent } from './vertical-layout.component'

describe(VerticalLayoutComponent.name, () => {
  it('should render', async () => {
    await render(VerticalLayoutComponent, {
      schemas: [NO_ERRORS_SCHEMA]
    })
  })
})
