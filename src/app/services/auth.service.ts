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
      if(user)
      {
        this.router.navigate(['home']);
      }
      else
      {
        this.router.navigate(['login']);
      }
    });
  }


  login(email: any, password: any) {
    this.auth.signInWithEmailAndPassword(email, password)
    .then((res: any) => {
      let user: User = {email: res.user.email, uid: res.user.uid, loginDate: Date.now()};
      console.log(user);
      this.firestore.addItem(user);
      this.router.navigate(['/home']);
    })
    .catch( (err) => {
      console.log(err)
      // if(err.code === 'auth/invalid-email' || err.code === 'user-not-found' || err.code === 'auth/wrong-password')
      // {
        
      // }
    });
  }

  register(email: any, password: any){
      this.auth.createUserWithEmailAndPassword(email, password)
      .then( () => {
        this.router.navigate(['home']);
      })
      .catch( (err) => {
        console.log(err.code);
        // if(err.code === 'auth/invalid-email')
        // {
          
        // }
        // else if(err.code === 'auth/weak-password')
        // {
          
        // }
        // else if(err.code === 'auth/email-already-in-use')
        // {
          
        // }
      });
    }

    logOut(){
      this.auth.signOut();
    }
}