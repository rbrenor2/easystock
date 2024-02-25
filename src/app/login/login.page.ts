import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <ion-content>
      <div class="flex justify-center items-start pt-40">
        <ion-card class="max-h-500 w-3/5">
          <ion-card-title class="text-center">Easystock</ion-card-title>
          <ion-card-content>
            <form [formGroup]="form">
              <!-- <ion-item>
                <ion-input type="email" label="Email" formControlName="email"></ion-input>
              </ion-item>
              <ion-item>
                <ion-input type="password" label="Password" formControlName="password"></ion-input>
              </ion-item> -->
                <ion-button type="submit" expand="block" (click)="login()">Login with Google</ion-button>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [``]
})
export class LoginPage {
  form = this.fb.group({
    email: [''],
    password: [''],
  })

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  login() {
    this.authService.loginWithGoogle();
  }
}
