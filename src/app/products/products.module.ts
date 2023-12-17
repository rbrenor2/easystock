import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsPage } from './products.page';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailModalComponent } from './components/product-detail-modal.component';
import { AddDataModalComponent } from './components/add-data-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProductsPage, ProductDetailModalComponent, AddDataModalComponent]
})
export class ProductsModule { }
