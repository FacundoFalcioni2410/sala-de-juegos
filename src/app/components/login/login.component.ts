import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  mensaje: string;
  alert = false;

  constructor(private auth: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
    this.mensaje = '';
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
      this.auth.login(this.email, this.password);
    }
  }

}
