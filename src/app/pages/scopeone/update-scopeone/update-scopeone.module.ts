import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateScopeonePageRoutingModule } from './update-scopeone-routing.module';

import { UpdateScopeonePage } from './update-scopeone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateScopeonePageRoutingModule
  ],
  declarations: [UpdateScopeonePage]
})
export class UpdateScopeonePageModule {}
