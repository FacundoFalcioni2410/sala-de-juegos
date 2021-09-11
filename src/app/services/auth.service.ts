import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn: any = false;

  constructor(private auth: AngularFireAuth, private router: Router, private firestore: FirestoreService) {
    this.auth.authState.subscribe((user) => {
      this.isLoggedIn = user;
      console.log(user?.email);
    });
  }


  login(email: any, password: any) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  register(email: any, password: any){
      return this.auth.createUserWithEmailAndPassword(email, password)
    }

    logOut(){
      this.auth.signOut();
    }
}