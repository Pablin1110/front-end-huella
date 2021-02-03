import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateScopetwoPage } from './update-scopetwo.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateScopetwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateScopetwoPageRoutingModule {}
