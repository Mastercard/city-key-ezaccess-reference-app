import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'prepare',
    loadChildren: () => import('./prepare/cards-prepare.module').then(m => m.CardsPrepareModule),
    data: {
      breadcrumb: {
        label: 'Add Cards'
      }
    }
  },
  {
    path: '',
    loadChildren: () => import('./list/cards-list.module').then(m => m.CardsListModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class CardsModule { }
