import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductDetailModalComponent } from './components/product-detail-modal.component';
import { AddDataModalComponent } from './components/add-data-modal.component';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'es-products-page',
  template: `
       <ion-header [translucent]="true">
       <ion-toolbar>
          <ion-title>Produtos</ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar show-clear-button="focus" [value]="filter" placeholder="Busque produtos por nome ou código"></ion-searchbar>
        </ion-toolbar>
      </ion-header>

      <ion-content [fullscreen]="true">
        <ion-fab slot="fixed" vertical="bottom" horizontal="end" [edge]="false">
          <ion-fab-button (click)="addSheet()">
            <ion-icon name="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        <ion-list>
          <ion-item button *ngFor="let product of products; let index" (click)="onTapProduct(product)">
            <ion-avatar slot="start">
              <img [src]="'https://picsum.photos/80/80?random=' + index" alt="avatar" />
            </ion-avatar>
            <ion-label>{{ product.name }}</ion-label>
            <ion-text>{{ product.quantity }}</ion-text>
          </ion-item>
        </ion-list>
        <ion-infinite-scroll (ionInfinite)="onLoadMore($event)">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ion-content>
  `,
  styles: [``]
})
export class ProductsPage {

  filter: string = ""

  products: Product[] = [{ id: "asdffvytr", name: "Ovo frito", quantity: 12, pricePerUnit: 26.90 }, { id: "989898", name: "Rã 500g", quantity: 24, pricePerUnit: 23.90 }, { id: "potmigrtoig", name: "Pirulito 500g", quantity: 9, pricePerUnit: 32.90 }]

  constructor(private modalCtrl: ModalController) { }

  onLoadMore(event: any) { }

  async addSheet() {
    // Go to product detail page or open a dialog to update
    const modal = await this.modalCtrl.create({
      component: AddDataModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  async onTapProduct(product: Product) {
    // Go to product detail page or open a dialog to update
    const modal = await this.modalCtrl.create({
      component: ProductDetailModalComponent,
      initialBreakpoint: 0.5,
      breakpoints: [0.5, 0.75],
      componentProps: {
        product,
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();


  }

}
