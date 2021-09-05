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
  alertError = '';
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
        console.log(res);
        let user: User = {email: res.user.email, uid: res.user.uid, loginDate: Date.now()};
        console.log(user);
        this.firestore.addItem(user);
      })
      .catch( (err) => {
        if(err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password')
        {
          this.alertError = 'La contraseña o el mail son invalidos';
          // var snackBarRef = this.snackBar.open('The e-mail or password are invalid' ,'OK!');
          // setTimeout(()=>{
          //   snackBarRef.dismiss();  
          // })
          // snackBarRef.afterDismissed().subscribe(() => {  
          //   console.log('The snack-bar was dismissed');  
          // });  
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
          this.alertError = 'Formato de mail invalido';
        }
        else if(err.code === 'auth/weak-password')
        {
          this.alertError = 'La contraseña debe tener 6 o más caracteres';
        }
        else if(err.code === 'auth/email-already-in-use')
        {
          this.alertError = 'Ya hay un usuario registrado con ese mail';
        }
      });
    }
  }

}
