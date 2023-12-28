import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BranchesService } from 'src/app/services/branches.service';
import { ProductsService } from 'src/app/services/products.service';
import { Branch } from 'src/app/shared/models/branch.model';
import * as XLSX from 'xlsx'

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
          <ion-item>
            <form [formGroup]="form">
              <ion-select formControlName="branch" label="Filial">
                @for (branch of branches$ | async; track $index) {
                  <ion-select-option [value]="branch">{{branch.displayName}}</ion-select-option>
                } @empty {
                  Nenhuma filial cadastrada
                }
              </ion-select>
              <ion-input label="Código/Identificador" formControlName="id"></ion-input>
              <ion-input label="Nome" formControlName="name"></ion-input>
              <ion-input label="Quantidade" formControlName="quantity"></ion-input>
              <ion-input label="Preço" formControlName="price"></ion-input>
            </form>
          </ion-item>
          <ion-card expand="block" button (click)="fileInput.click()">
            <ion-card-header>
              <ion-card-title>Selecione o arquivo .xlsx</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-icon name="upload"></ion-icon>
              <input #fileInput hidden="true" type="file" (change)="readExcel($event)" />
            </ion-card-content>
          </ion-card>
      </ion-content>
  `,
  styles: [``],
})
export class AddDataModalComponent {
  form = this.fb.group({
    id: ['Codigo'],
    name: ['Produto'],
    quantity: ['Quantidade'],
    price: ['Preco'],
    branch: [{ id: '' }]
  })

  data: any;

  branches$: Observable<Branch[]>;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private productService: ProductsService, private branchService: BranchesService) {
    this.branches$ = this.branchService.list()
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.productService.addProducts(this.form.controls.branch.value!.id, this.form.value, this.data)
    // .subscribe((res) => {
    //   console.log(res)

    //   this.modalCtrl.dismiss({ columns: this.form.value, data: this.data }, 'confirm');
    // })
  }

  readExcel(event: any) {
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = (e: any) => {
      const binarystr = new Uint8Array(e.target.result);
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'array', raw: true, cellFormula: false });

      const wsname = wb.SheetNames[0];
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);

      this.data = data
    }
  }
}
