import { Component, Input, signal } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'es-product-detail-modal',
  template: `
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button (click)="cancel()"><ion-icon name="close"></ion-icon></ion-button>
          </ion-buttons>
          <ion-title>Atualizar produto</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="confirm()" [strong]="true">Confirmar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
        <ion-content class="ion-padding">
            <ion-toast
              [isOpen]="showAlert()"
              [message]="alertMessage()"
              [duration]="3000"
              (didDismiss)="showAlert.set(false)"
            ></ion-toast>
            <ion-card>
              <div class="flex flex-col">
                <div class="flex flex-row justify-between">
                  <ion-button (click)="subtract()" fill="clear"><ion-icon name="remove-circle-outline"></ion-icon></ion-button>
                  <ion-card-title>{{ amount() }}</ion-card-title>
                  <ion-button (click)="add()" fill="clear"><ion-icon name="add-circle-outline"></ion-icon></ion-button>
                </div>
              </div>
              <ion-card-header>
                <ion-card-subtitle>{{ product.name }} - Atual: {{ product.quantity }}</ion-card-subtitle>
                <ion-card-title>Nova quantidade: {{ newQuantity() }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-title></ion-title>
              </ion-card-content>
            </ion-card>
        </ion-content>
        
  `,
  styles: [``],
})
export class ProductDetailModalComponent {
  @Input() product!: Product;
  @Input() branchId!: string;

  amount = signal(0)
  newQuantity = signal(0)
  showAlert = signal(false)
  alertMessage = signal('')

  constructor(private modalCtrl: ModalController, private productService: ProductsService) { }

  ngOnInit(): void {
    this.newQuantity.set(this.product.quantity)
  }

  add() {
    this.newQuantity.update((value) => value + 1)
    this.amount.update((value) => value + 1)
  }

  subtract() {
    if (this.newQuantity() > 0) {
      this.newQuantity.update((value) => value - 1)
      this.amount.update((value) => value - 1)
    } else {
      this.alertMessage.update(_ => "Nenhuma unidade disponível")
      this.showAlert.update(_ => true)
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.productService.updateProduct(this.product.id, this.branchId, this.newQuantity()).subscribe(res => {
      this.modalCtrl.dismiss(this.newQuantity, 'confirm');
    })
  }

}
