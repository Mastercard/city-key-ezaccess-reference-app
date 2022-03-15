import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatTabsModule } from '@angular/material/tabs'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatIconModule } from '@angular/material/icon'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { SharedModule } from 'app/shared/modules/shared.module'
import { VerticalLayoutModule } from 'app/shared/components/vertical-layout/vertical-layout.module'
import { SearchActionHeaderModule } from 'app/shared/components/search-action-header/search-action-header.module'

import { cardsPrepareReducer } from './ngrx/cards-prepare.reducer'
import { CardsPrepareEffects } from './ngrx/cards-prepare.effects'
import { CardsPrepareService } from './cards-prepare.service'
import { CardsPrepareComponent } from './cards-prepare.component'
import { CardsPrepareAssignProgramDialogComponent } from './components/assign-program-dialog/assign-program-dialog.component'
import { CardsPrepareAssignCardDialogComponent } from './components/assign-card-dialog/assign-card-dialog.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CardsPrepareComponent
  }
]

@NgModule({
  declarations: [
    CardsPrepareComponent,
    CardsPrepareAssignProgramDialogComponent,
    CardsPrepareAssignCardDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('cardsPrepare', cardsPrepareReducer),
    EffectsModule.forFeature([CardsPrepareEffects]),
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    VerticalLayoutModule,
    SearchActionHeaderModule
  ],
  providers: [CardsPrepareService],
  bootstrap: [CardsPrepareComponent]
})
export class CardsPrepareModule { }
