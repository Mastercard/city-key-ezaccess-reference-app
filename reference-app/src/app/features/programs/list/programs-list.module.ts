import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { SharedModule } from 'app/shared/modules/shared.module'
import { VerticalLayoutModule } from 'app/shared/components/vertical-layout/vertical-layout.module'
import { SearchActionHeaderModule } from 'app/shared/components/search-action-header/search-action-header.module'
import { PaginatedTableModule } from 'app/shared/components/paginated-table/paginated-table.module'

import { programsListReducer } from './ngrx/programs-list.reducer'
import { ProgramsListEffects } from './ngrx/programs-list.effects'
import { ProgramsListService } from './programs-list.service'
import { ProgramsListComponent } from './programs-list.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProgramsListComponent
  }
]

@NgModule({
  declarations: [
    ProgramsListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('programsList', programsListReducer),
    EffectsModule.forFeature([ProgramsListEffects]),
    MatButtonModule,
    SharedModule,
    VerticalLayoutModule,
    SearchActionHeaderModule,
    PaginatedTableModule
  ],
  providers: [ProgramsListService],
  bootstrap: [ProgramsListComponent]
})
export class ProgramsListModule { }
