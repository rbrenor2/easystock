import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataPage } from './data.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DataRoutingModule } from './data-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DataRoutingModule
  ],
  declarations: [DataPage]
})
export class DataModule { }
