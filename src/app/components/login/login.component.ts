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
    let snackBarRef = this.snackBar.open('Mensaje');

    this.snackBar.open('error');
    if(this.email !== '' && this.password !== '')
    {
      this.auth.login(this.email, this.password)
      .then((res: any) => {
        let user: User = {email: res.user.email, uid: res.user.uid, loginDate: Date.now()};
        console.log(user);
        this.firestore.addItem(user);
      })
      .catch( (err) => {
        this.mensaje = err.code;
        this.alert = true;
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
        console.log(err.code);
        this.mensaje = err.code;
        this.alert = true;
      });
    }
  }

}
