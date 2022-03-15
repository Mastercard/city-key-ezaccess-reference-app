import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'vertical-layout',
  template: '<ng-content></ng-content>',
  styleUrls: ['./vertical-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalLayoutComponent {
}
