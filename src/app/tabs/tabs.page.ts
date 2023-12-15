import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  template: `
    <ion-tabs>
      
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="products" href="/tabs/products">
          <ion-icon aria-hidden="true" name="list-outline"></ion-icon>
          <ion-label>Produtos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="data" href="/tabs/data">
          <ion-icon aria-hidden="true" name="stats-chart-outline"></ion-icon>
          <ion-label>Dados</ion-label>
        </ion-tab-button>

        
      </ion-tab-bar>

      </ion-tabs>

  `,
  styles: [``]
})
export class TabsPage {

  constructor() { }

}
