import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatChipsModule } from '@angular/material/chips'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { SharedModule } from 'app/shared/modules/shared.module'
import { VerticalLayoutModule } from 'app/shared/components/vertical-layout/vertical-layout.module'
import { SearchActionHeaderModule } from 'app/shared/components/search-action-header/search-action-header.module'
import { PaginatedTableModule } from 'app/shared/components/paginated-table/paginated-table.module'

import { cardsListReducer } from './ngrx/cards-list.reducer'
import { CardsListEffects } from './ngrx/cards-list.effects'
import { CardsListService } from './cards-list.service'
import { CardsListComponent } from './cards-list.component'
import { CardsListReplaceCardEaidDialogComponent } from './components/replace-card-eaid-dialog/replace-card-eaid-dialog.component'
import { CardsListAssignProgramDialogComponent } from './components/assign-program-dialog/assign-program-dialog.component'
import { CardsListUnassignProgramDialogComponent } from './components/unassign-program-dialog/unassign-program-dialog.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CardsListComponent
  }
]

@NgModule({
  declarations: [
    CardsListComponent,
    CardsListReplaceCardEaidDialogComponent,
    CardsListAssignProgramDialogComponent,
    CardsListUnassignProgramDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('cardsList', cardsListReducer),
    EffectsModule.forFeature([CardsListEffects]),
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    SharedModule,
    VerticalLayoutModule,
    SearchActionHeaderModule,
    PaginatedTableModule
  ],
  providers: [CardsListService],
  bootstrap: [CardsListComponent]
})
export class CardsListModule { }
