import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateScopeonePage } from './update-scopeone.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateScopeonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateScopeonePageRoutingModule {}
