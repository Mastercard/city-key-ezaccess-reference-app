import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: ':programId',
    loadChildren: () => import('./detail/programs-detail.module').then(m => m.ProgramsDetailModule),
    data: {
      breadcrumb: {
        label: 'Program Details'
      }
    }
  },
  {
    path: '',
    loadChildren: () => import('./list/programs-list.module').then(m => m.ProgramsListModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProgramsModule { }
