import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, authState, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);


  redirect = ['/tabs/products'];

  constructor(private router: Router) { }

  organization() {
    return 'test-organization'
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
    await this.router.navigate(this.redirect).then((res) => console.log(res));
  }

  async logout() {
    await signOut(this.auth);
    await this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authState$.pipe(map((user) => !user ? false: true))
  }
}
