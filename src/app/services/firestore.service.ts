import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private af: AngularFirestore, private router: Router) { }

  addItem(user: User){
    this.af.collection('usuarios').add(user)
    .then(() => this.router.navigate(['home']));
  }
}
