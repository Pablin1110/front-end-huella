import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateOrganizationPageRoutingModule } from './update-organization-routing.module';

import { UpdateOrganizationPage } from './update-organization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateOrganizationPageRoutingModule
  ],
  declarations: [UpdateOrganizationPage]
})
export class UpdateOrganizationPageModule {}
