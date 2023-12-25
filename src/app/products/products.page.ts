import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { ProductDetailModalComponent } from './components/product-detail-modal.component';
import { AddDataModalComponent } from './components/add-data-modal.component';
import { Product } from '../shared/models/product.model';
import { ProductsService } from '../services/products.service';
import { from } from 'rxjs';

@Component({
  selector: 'es-products-page',
  template: `
       <ion-header [translucent]="true">
       <ion-toolbar>
          <ion-title>Produtos</ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar [debounce]="1000" (ionInput)="onSearch($event)" show-clear-button="focus" [value]="filter" placeholder="Busque produtos por nome"></ion-searchbar>
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

  products: Product[] = []

  constructor(private modalCtrl: ModalController, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.onLoadMore(null)
  }

  onSearch(event: any) {
    this.productsService.getProductsPage(event.target.value).subscribe((res) => {
      this.products = res.docs.map(doc => doc.data()) as Product[]
    })
  }

  onLoadMore(event: any) {
    this.productsService.getProductsPage().subscribe((res) => {
      this.products = res.docs.map(doc => doc.data()) as Product[]
      setTimeout(() => {
        (event as InfiniteScrollCustomEvent)?.target?.complete();
      }, 500);
    })
  }

  async addSheet() {
    const modal = await this.modalCtrl.create({
      component: AddDataModalComponent,
    });
    modal.present();
  }

  async onTapProduct(product: Product) {
    const modal = await this.modalCtrl.create({
      component: ProductDetailModalComponent,
      initialBreakpoint: 0.5,
      breakpoints: [0.5, 0.75],
      componentProps: {
        product,
      }
    });
    modal.present();

    from(modal.onWillDismiss()).subscribe(_ => {
      this.onLoadMore(null)
    })
  }

}
