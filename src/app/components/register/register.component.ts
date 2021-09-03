import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  register(){
    if(this.email !== '' && this.password !== '')
    {
      this.auth.register(this.email, this.password);
    }
  }

}
