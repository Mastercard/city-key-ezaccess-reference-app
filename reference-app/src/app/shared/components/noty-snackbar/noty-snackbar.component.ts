import { Component, Inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'

import { ToastrType } from 'app/shared/constants'

@Component({
  selector: 'noty-snackbar',
  templateUrl: './noty-snackbar.component.html',
  styleUrls: ['./noty-snackbar.component.scss']
})
export class NotySnackbarComponent {
  get message(): string { return this.data.message }
  get type(): ToastrType { return this.data.type }

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: {
      message: string,
      type: ToastrType
    }
  ) { }
}
