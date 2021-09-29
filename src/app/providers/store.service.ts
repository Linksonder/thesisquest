import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public store: AngularFirestore, public auth: AuthService) { 

  }

  public collection(name : string) : AngularFirestoreCollection {
    return this.store.collection('profiles').doc(this.auth.user.email).collection(name);
  }

}
