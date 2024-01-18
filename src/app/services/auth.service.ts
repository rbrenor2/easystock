import { Injectable } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { }

  organization() {
    return 'test-organization'
  }

  login(email: string, password: string) {
    const auth = getAuth();
    from(signInWithEmailAndPassword(auth, email, password))
      .subscribe((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
      })
  }

  getUser() {
    return getAuth().currentUser
  }

  getUsername() {

  }
}
