import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private af: AngularFirestore) { }

  addItem(user: User){
    this.af.collection('usuarios').add(user);
  }
}
