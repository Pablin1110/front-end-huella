import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarbonPageRoutingModule } from './carbon-routing.module';

import { CarbonPage } from './carbon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarbonPageRoutingModule
  ],
  declarations: [CarbonPage]
})
export class CarbonPageModule {}
