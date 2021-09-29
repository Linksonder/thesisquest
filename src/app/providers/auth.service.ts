import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  public user: any;
  
  constructor(public auth: AngularFireAuth) {
    this.user$ = auth.user;
    this.user$.subscribe(user => {
      this.user = user;
    })
  }

  login() {
    this.auth.signInWithPopup(new GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
