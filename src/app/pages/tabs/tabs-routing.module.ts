import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard} from 'src/app/guards/auth.guard';


import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'principal', loadChildren: () => import('../principal/principal.module').then( m => m.PrincipalPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'results', loadChildren: () => import('../results/results.module').then( m => m.ResultsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'user', loadChildren: () => import('../user/user.module').then( m => m.UserPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/principal',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/principal',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
