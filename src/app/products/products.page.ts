import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { ProductDetailModalComponent } from './components/product-detail-modal.component';
import { AddDataModalComponent } from './components/add-data-modal.component';
import { Product } from '../shared/models/product.model';
import { ProductsService } from '../services/products.service';
import { Observable, from, tap } from 'rxjs';
import { Branch } from '../shared/models/branch.model';
import { BranchesService } from '../services/branches.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'es-products-page',
  template: `
       <ion-header [translucent]="true">
       <ion-toolbar>
          <ion-title>Produtos</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="logout()">
              <ion-icon name="log-out"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar>
          <ion-item>
            <ion-select [formControl]="branch" label="Filial">
                @for (branch of branches$ | async; track $index) {
                  <ion-select-option [value]="branch">{{branch.displayName}}</ion-select-option>
                } @empty {
                  Nenhuma filial cadastrada
                }
            </ion-select>
          </ion-item>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar [debounce]="1000" [formControl]="filter" (ionInput)="onSearch()" show-clear-button="focus" [value]="filter" placeholder="Busque produtos por nome"></ion-searchbar>
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

  filter = new FormControl("")
  branch = new FormControl({ id: "" })

  products: Product[] = []

  branches$: Observable<Branch[]>;

  constructor(private modalCtrl: ModalController, private productsService: ProductsService, private branchService: BranchesService, private authService: AuthService) {
    this.branches$ = this.branchService.list().pipe(tap(branches => {
      this.branch.setValue(branches[0])
      this.onLoadMore(null)
    }))

    this.branch.valueChanges.subscribe((branch) => {
      this.productsService.getProductsPage(branch!.id, this.filter.value ?? undefined).subscribe((res) => {
        this.products = res.docs.map(doc => doc.data()) as Product[]
      })
    })
  }

  onSearch() {
    this.productsService.getProductsPage(this.branch.value!.id, this.filter.value ?? "").subscribe((res) => {
      this.products = res.docs.map(doc => doc.data()) as Product[]
    })
  }

  onLoadMore(event: any) {
    this.productsService.getProductsPage(this.branch.value!.id).subscribe((res) => {
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

    from(modal.onWillDismiss()).subscribe(_ => {
      this.onSearch()
    })
  }

  async onTapProduct(product: Product) {
    const modal = await this.modalCtrl.create({
      component: ProductDetailModalComponent,
      initialBreakpoint: 0.5,
      breakpoints: [0.5, 0.75],
      componentProps: {
        product,
        branchId: this.branch.value!.id
      }
    });
    modal.present();

    from(modal.onWillDismiss()).subscribe(_ => {
      this.onSearch()
    })
  }

  logout() {
    this.authService.logout();
  }

}
