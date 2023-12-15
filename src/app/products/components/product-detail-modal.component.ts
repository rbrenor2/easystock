import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'es-product-detail-modal',
  template: `
      <ion-modal (willDismiss)="onWillDismiss($event)">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button (click)="onCancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Welcome</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="onConfirm()" [strong]="true">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
              label="Enter your name"
              labelPlacement="stacked"
              type="text"
              placeholder="Your name"
              [(ngModel)]="name"
            ></ion-input>
          </ion-item>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  styles: [``],
})
export class ProductDetailModalComponent implements OnInit {
  name: string = ""

  constructor() { }

  ngOnInit() { }

  onWillDismiss(event: any) { }

  onCancel() { }

  onConfirm() { }

}
