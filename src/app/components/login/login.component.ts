import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  login(){
    if(this.email !== '' && this.password !== '')
    {
      this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then( () => {
        this.router.navigate(['/home']);
      })
    }
  }

}
