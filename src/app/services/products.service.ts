import { Injectable, inject, signal } from '@angular/core';
import { Firestore, and, collection, doc, getDocs, limit, or, orderBy, query, runTransaction, startAfter, updateDoc, where } from '@angular/fire/firestore';
import { forkJoin, from, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Document, Log, LogAction } from '../shared/models/log.model';
import { LogsService } from './logs.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  firestore: Firestore = inject(Firestore);
  productsPath: string;

  currentPage = signal(1)
  pageSize = signal(15)

  constructor(private authService: AuthService, private logService: LogsService) {
    this.productsPath = `organizations/${this.authService.organization()}/products`
  }

  getProductsPage(branchId: string, filter?: string) {
    if (filter) {
      const constraints = and(where("name", '>=', filter), where("branchId", '==', branchId))

      if (this.currentPage() === 1) {
        const first = query(
          collection(this.firestore, this.productsPath),
          constraints,
          orderBy("name"),
          limit(this.pageSize())
        );

        this.currentPage.update(value => value + 1)
        return from(getDocs(first))
      } else {
        const next =
          query(
            collection(this.firestore, this.productsPath),
            constraints,
            orderBy("name"),
            startAfter(this.currentPage() * this.pageSize()),
            limit(this.pageSize())
          );

        this.currentPage.update(value => value + 1)
        return from(getDocs(next))
      }
    } else {
      if (this.currentPage() === 1) {
        const first = query(
          collection(this.firestore, this.productsPath),
          where("branchId", '==', branchId),
          orderBy("name"),
          limit(this.pageSize())
        );

        this.currentPage.update(value => value + 1)
        return from(getDocs(first))
      } else {
        const next =
          query(
            collection(this.firestore, this.productsPath),
            where("branchId", '==', branchId),
            orderBy("name"),
            startAfter(this.currentPage() * this.pageSize()),
            limit(this.pageSize())
          );

        this.currentPage.update(value => value + 1)
        return from(getDocs(next))
      }
    }

  }

  addProducts(branchId: string, columns: any, data: any[]) {
    try {
      const products: Document[] = []

      const transactions = data.map((item: any) => {
        products.push({ productName: item[columns["name"]], quantity: item[columns["quantity"]], branchId })
        return from(runTransaction(this.firestore, async (transaction) => {
          const productRef = doc(this.firestore, this.productsPath, `${branchId}_${item[columns["id"]]}`.toString());
          const productDoc = await transaction.get(productRef);

          if (productDoc.exists() && productDoc.data()["branchId"] == branchId) {
            const updatedProduct = { quantity: productDoc.data()["quantity"] + item[columns["quantity"]] }
            transaction.update(productRef, updatedProduct)
          } else {
            transaction.set(productRef, { id: item[columns["id"]].toString(), name: item[columns["name"]], quantity: item[columns["quantity"]], price: item[columns["price"]], branchId })
          }
        }))
      })

      const log = {
        action: LogAction.ADD_PRODUCTS,
        userId: "PLACEHOLDER_USER",
        organizationId: this.authService.organization(),
        productNumber: transactions.length,
        documents: products
      } as unknown as Log

      const logRequest = this.logService.log(log)

      return forkJoin([...transactions, logRequest])
    } catch (e) {
      return of(e)
    }
  }

  updateProduct(id: string, branchId: string, newQuantity: number) {
    try {
      return from(updateDoc(doc(this.firestore, this.productsPath, `${branchId}_${id}`), { quantity: newQuantity }))
    } catch (e) {
      return of(e)
    }
  }
}
