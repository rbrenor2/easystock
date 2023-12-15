import { Component } from '@angular/core';

@Component({
  selector: 'es-data',
  template: `
    <ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>
      Tab 2
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Tab 2</ion-title>
    </ion-toolbar>
  </ion-header>

  <app-explore-container name="Tab 2 page"></app-explore-container>
</ion-content>

  `,
  styles: [``]
})
export class DataPage {

  constructor() { }

}
