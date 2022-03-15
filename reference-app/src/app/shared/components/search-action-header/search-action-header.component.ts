import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core'
import { Nullable } from 'ngx-mclabs-utils'

import { BreadcrumbService } from 'app/shared/services/breadcrumb.service'

@Component({
  selector: 'search-action-header',
  templateUrl: './search-action-header.component.html',
  styleUrls: ['./search-action-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchActionHeaderComponent {
  @Input()
    title?: string

  @Input()
    actionsRef!: TemplateRef<unknown>

  get backLink(): Nullable<string> {
    const { breadcrumbs } = this._breadcrumbService

    return breadcrumbs.length > 1
      ? breadcrumbs[breadcrumbs.length - 2].path
      : null
  }

  constructor(private _breadcrumbService: BreadcrumbService) {}
}
