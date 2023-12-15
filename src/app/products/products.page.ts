import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductDetailModalComponent } from './components/product-detail-modal.component';
import { AddDataModalComponent } from './components/add-data-modal.component';

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
          <ion-item button *ngFor="let item of items; let index" (click)="onTapProduct(item)">
            <!-- <ion-avatar slot="start">
              <img [src]="'https://picsum.photos/80/80?random=' + index" alt="avatar" />
            </ion-avatar> -->
            <ion-label>{{ item.name }}</ion-label>
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

  items = [{ name: "Ovo frito" }, { name: "Rã 500g" }, { name: "Melancia 500g" }]

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

  async onTapProduct(item: any) {
    // Go to product detail page or open a dialog to update
    const modal = await this.modalCtrl.create({
      component: ProductDetailModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();


  }

}
