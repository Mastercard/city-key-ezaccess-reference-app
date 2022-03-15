import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MatTabsModule } from '@angular/material/tabs'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTooltipModule } from '@angular/material/tooltip'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { SharedModule } from 'app/shared/modules/shared.module'
import { VerticalLayoutModule } from 'app/shared/components/vertical-layout/vertical-layout.module'
import { SearchActionHeaderModule } from 'app/shared/components/search-action-header/search-action-header.module'
import { PaginatedTableModule } from 'app/shared/components/paginated-table/paginated-table.module'

import { programsDetailReducer } from './ngrx/programs-detail.reducer'
import { ProgramsDetailEffects } from './ngrx/programs-detail.effects'
import { ProgramsDetailService } from './programs-detail.service'
import { ProgramsDetailComponent } from './programs-detail.component'
import { ProgramsDetailCardsTabComponent } from './components/cards-tab/cards-tab.component'
import { ProgramsDetailUnassignCardDialogComponent } from './components/unassign-card-dialog/unassign-card-dialog.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProgramsDetailComponent
  }
]

@NgModule({
  declarations: [
    ProgramsDetailComponent,
    ProgramsDetailCardsTabComponent,
    ProgramsDetailUnassignCardDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('programsDetail', programsDetailReducer),
    EffectsModule.forFeature([ProgramsDetailEffects]),
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    SharedModule,
    VerticalLayoutModule,
    SearchActionHeaderModule,
    PaginatedTableModule
  ],
  providers: [ProgramsDetailService],
  bootstrap: [ProgramsDetailComponent]
})
export class ProgramsDetailModule { }
