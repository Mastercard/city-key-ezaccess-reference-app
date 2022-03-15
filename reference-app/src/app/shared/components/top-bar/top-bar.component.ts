import { Component } from '@angular/core'
import { trackById } from 'ngx-mclabs-utils'

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  readonly trackByFn = trackById

  readonly shownNavigations = [
    { id: 'cards', title: 'Cards', route: '/cards' },
    { id: 'programs', title: 'Programs', route: '/programs' }
  ]
}
