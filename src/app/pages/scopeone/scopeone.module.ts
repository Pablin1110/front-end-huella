import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScopeonePageRoutingModule } from './scopeone-routing.module';

import { ScopeonePage } from './scopeone.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScopeonePageRoutingModule
  ],
  declarations: [ScopeonePage]
})
export class ScopeonePageModule {}
