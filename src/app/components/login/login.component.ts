import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  log: boolean;
  email: string;
  password: string;
  mensaje: string;
  alert = false;
  snackBar: MatSnackBar;

  constructor(public auth: AuthService, private router: Router, public firestore: FirestoreService, private snackbar: MatSnackBar) {
    this.email = '';
    this.password = '';
    this.mensaje = '';
    this.log = true;
    this.snackBar = snackbar
  }

  ngOnInit(): void {
  }

  loginRapido(){
    this.email = 'invitado@gmail.com';
    this.password = 'invitado';
  }

  login(){    
    if(this.email !== '' && this.password !== '')
    {
      this.auth.login(this.email, this.password)
      .then((res: any) => {
        let user: User = {email: res.user.email, uid: res.user.uid, loginDate: Date.now()};
        console.log(user);
        this.firestore.addItem(user);
      })
      .catch( (err) => {
        if(err.code === 'auth/invalid-email' || err.code === 'user-not-found' || err.code === 'auth/wrong-password')
        {
          let snackBarRef = this.snackBar.open('The e-mail or password are invalid');
          setTimeout(() => snackBarRef.dismiss(), 2000);
        }
      });
    }
  }

  register(){
    if(this.email !== '' && this.password !== '')
    {
      this.auth.register(this.email, this.password)
      .then( (res: any) => {
          console.log(res);
          let user: User = {email: res.user.email, uid: res.user.uid, loginDate: Date.now()};
          this.firestore.addItem(user);
        })
      .catch( (err) => {
        if(err.code === 'auth/invalid-email')
        {
          let snackBarRef = this.snackBar.open('Invalid e-mail');
          setTimeout(() => snackBarRef.dismiss(), 2000);
        }
        else if(err.code === 'auth/weak-password')
        {
          let snackBarRef = this.snackBar.open('The password must have, at least, 6 characters');
          setTimeout(() => snackBarRef.dismiss(), 2000);
        }
        else if(err.code === 'auth/email-already-in-use')
        {
          let snackBarRef = this.snackBar.open('E-mail is currently being used');
          setTimeout(() => snackBarRef.dismiss(), 2000);
        }

        
      });
    }
  }

}
