import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScopeonePage } from './scopeone.page';

const routes: Routes = [
  {
    path: '',
    component: ScopeonePage
  },
  {
    path: 'update-scopeone',
    loadChildren: () => import('./update-scopeone/update-scopeone.module').then( m => m.UpdateScopeonePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScopeonePageRoutingModule {}
