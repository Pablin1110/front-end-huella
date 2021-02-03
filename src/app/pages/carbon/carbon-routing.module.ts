import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarbonPage } from './carbon.page';

const routes: Routes = [
  {
    path: '',
    component: CarbonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarbonPageRoutingModule {}
