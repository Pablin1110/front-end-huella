import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateScopetwoPageRoutingModule } from './update-scopetwo-routing.module';

import { UpdateScopetwoPage } from './update-scopetwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateScopetwoPageRoutingModule
  ],
  declarations: [UpdateScopetwoPage]
})
export class UpdateScopetwoPageModule {}
