import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { from } from 'rxjs';
import { Log } from '../shared/models/log.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  firestore: Firestore = inject(Firestore);
  logsPath: string;

  constructor(private authService: AuthService) {
    this.logsPath = `organizations/${this.authService.organization()}/logs`
  }

  log(log: Log) {
    const date = new Date()
    const logRef = collection(this.firestore, this.logsPath);

    return from(addDoc(logRef, { ...log, date }))
  }
}
