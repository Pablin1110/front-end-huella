import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScopetwoPageRoutingModule } from './scopetwo-routing.module';

import { ScopetwoPage } from './scopetwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScopetwoPageRoutingModule
  ],
  declarations: [ScopetwoPage]
})
export class ScopetwoPageModule {}
