import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, doc, getDocs, limit, or, orderBy, query, runTransaction, startAfter, updateDoc, where } from '@angular/fire/firestore';
import { Observable, from, map, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Branch } from '../shared/models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  firestore: Firestore = inject(Firestore);
  branchesPath: string;

  constructor(private authService: AuthService) {
    this.branchesPath = `organizations/${this.authService.organization()}/branches`
  }

  list(filter?: string) {
    if (filter) {
      const constraints = where("id", '>=', filter.toLowerCase())

      return from(getDocs(
        query(
          collection(this.firestore, this.branchesPath),
          constraints,
          orderBy("displayName")
        )
      )).pipe(map(res => res.docs.map(doc => doc.data()) as Branch[]))
    } else {
      return from(getDocs(
        query(
          collection(this.firestore, this.branchesPath),
          orderBy("displayName")
        )
      )).pipe(map(res => res.docs.map(doc => doc.data()) as Branch[]))
    }
  }
}
