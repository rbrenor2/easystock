import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, doc, runTransaction, writeBatch } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  firestore: Firestore = inject(Firestore);
  productsCollection: CollectionReference;

  constructor() {
    this.productsCollection = collection(this.firestore, 'products');
  }

  addProducts(columns: any, data: any[]) {
    try {
      data.forEach((item: any) => {
        const newPopulation = of(runTransaction(this.firestore, async (transaction) => {
          const productRef = doc(this.firestore, "products", item[columns["id"]]);
          const productDoc = await transaction.get(productRef);

          if (productDoc.exists()) {
            const updatedProduct = productDoc.data()["quantity"] + item[columns["quantity"]]
            transaction.update(productRef, updatedProduct)
          } else {
            transaction.set(productRef, { name: item[columns["name"]], quantity: item[columns["quantity"]], price: item[columns["price"]] })
          }
        }));
      })
    } catch (e) {
      // This will be a "population is too big" error.
      console.error(e);
    }


    // const batch = writeBatch(this.firestore);

    // data.forEach((item: any) => {
    //   const productRef = doc(this.firestore, "products", item[columns["id"]]);

    //   batch.set(
    //     productRef, { name: item[columns["name"]], quantity: item[columns["quantity"]], price: item[columns["price"]] }
    //   )
    // })

    // return of(batch.commit())
  }

  upsertProduct(id: string) {

  }
}
