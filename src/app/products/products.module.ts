import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsPage } from './products.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailModalComponent } from './components/product-detail-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ProductsRoutingModule
  ],
  declarations: [ProductsPage, ProductDetailModalComponent]
})
export class ProductsModule { }
