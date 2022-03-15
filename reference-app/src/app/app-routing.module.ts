import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'cards',
    loadChildren: () => import('./features/cards/cards.module').then(m => m.CardsModule),
    data: {
      breadcrumb: {
        label: 'Cards'
      }
    }
  },
  {
    path: 'programs',
    loadChildren: () => import('./features/programs/programs.module').then(m => m.ProgramsModule),
    data: {
      breadcrumb: {
        label: 'Programs'
      }
    }
  },
  {
    path: '**',
    redirectTo: 'cards'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
