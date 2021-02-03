import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateOrganizationPage } from './update-organization.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateOrganizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateOrganizationPageRoutingModule {}
