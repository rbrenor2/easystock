import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { from } from 'rxjs';
import { Log } from '../shared/models/log.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  firestore: Firestore = inject(Firestore);
  logsPath:string;

  constructor(private authService: AuthService) {
    this.logsPath = `organizations/${this.authService.organization()}/logs`
  }

  log(log: Log) {
    const logRef = doc(this.firestore, this.logsPath, `${log.action}_${log.product}`.toString());
    return from(setDoc(logRef, log))   
  }
}
