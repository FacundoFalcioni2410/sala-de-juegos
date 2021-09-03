import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/compat';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any;

  constructor(public auth: AuthService) {
    this.user = this.auth.isLoggedIn;
  }

  ngOnInit(): void {
  }

}
