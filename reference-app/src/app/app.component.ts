import { Component, OnInit } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _matIconRegistry: MatIconRegistry
  ) { }

  ngOnInit(): void {
    this._matIconRegistry.setDefaultFontSetClass('material-icons-outlined')
  }
}
