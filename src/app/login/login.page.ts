import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <ion-content [fullscreen]="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title>easystock</ion-card-title>
        </ion-card-header>

        <ion-card-content>
            <form [formGroup]="form">
              <ion-input label="Email" formControlName="email"></ion-input>
              <ion-input label="Senha" formControlName="password"></ion-input>
            </form>
        </ion-card-content>

        <ion-button fill="clear" (click)="login()">Entrar</ion-button>
      </ion-card>
    </ion-content>
  `,
  styles: [``],
})
export class LoginPage implements OnInit {
  form = this.fb.group({
    email: [''],
    password: ['']
  })

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.form.controls.email.value!, this.form.controls.password.value!)
  }
}
