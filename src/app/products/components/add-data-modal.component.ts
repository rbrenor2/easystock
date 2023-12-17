import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-data-modal',
  template: `
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button (click)="cancel()"><ion-icon name="close"></ion-icon></ion-button>
          </ion-buttons>
          <ion-title>Adicionar pedidos</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="confirm()" [strong]="true"><ion-icon name="add"></ion-icon></ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
          <ion-card expand="block" button (click)="fileInput.click()">
            <ion-card-header>
              <ion-card-title>Selecione o arquivo .xlsx</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-icon name="upload"></ion-icon>
              <input #fileInput hidden="true" type="file" />
            </ion-card-content>
          </ion-card>
      </ion-content>
  `,
  styles: [``],
})
export class AddDataModalComponent {
  name = ""

  constructor(private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
