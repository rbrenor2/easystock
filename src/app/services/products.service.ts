import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, doc, getDocs, limit, orderBy, query, runTransaction, startAfter, updateDoc } from '@angular/fire/firestore';
import { from, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  firestore: Firestore = inject(Firestore);
  productsPath: string;

  currentPage = signal(1)
  pageSize = signal(5)

  constructor(private authService: AuthService) {
    this.productsPath = `organizations/${this.authService.organization()}/products`
  }

  getProductsPage() {
    if (this.currentPage() === 1) {
      const first = query(collection(this.firestore, this.productsPath), orderBy("name"), limit(this.pageSize()));

      this.currentPage.update(value => value + 1)
      return from(getDocs(first))
    } else {
      const next =
        query(
          collection(this.firestore, this.productsPath),
          orderBy("name"),
          startAfter(this.currentPage() * this.pageSize()),
          limit(this.pageSize())
        );

      this.currentPage.update(value => value + 1)
      return from(getDocs(next))
    }
  }

  addProducts(columns: any, data: any[]) {
    try {
      data.forEach((item: any) => {
        of(runTransaction(this.firestore, async (transaction) => {
          const productRef = doc(this.firestore, this.productsPath, item[columns["id"]].toString());
          const productDoc = await transaction.get(productRef);

          if (productDoc.exists()) {
            const updatedProduct = productDoc.data()["quantity"] + item[columns["quantity"]]
            transaction.update(productRef, updatedProduct)
          } else {
            transaction.set(productRef, { id: item[columns["id"]].toString(), name: item[columns["name"]], quantity: item[columns["quantity"]], price: item[columns["price"]] })
          }
        })).subscribe((res) => console.log(res));
      })
    } catch (e) {
      // This will be a "population is too big" error.
      console.error(e);
    }
  }

  updateProduct(id: string, newQuantity: number) {
    try {
      return from(updateDoc(doc(this.firestore, this.productsPath, id.toString()), { quantity: newQuantity }))
    } catch (e) {
      return of(e)
    }
  }
}
