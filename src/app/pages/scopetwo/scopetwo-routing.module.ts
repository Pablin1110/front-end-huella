import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScopetwoPage } from './scopetwo.page';

const routes: Routes = [
  {
    path: '',
    component: ScopetwoPage
  },
  {
    path: 'update-scopetwo',
    loadChildren: () => import('./update-scopetwo/update-scopetwo.module').then( m => m.UpdateScopetwoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScopetwoPageRoutingModule {}
