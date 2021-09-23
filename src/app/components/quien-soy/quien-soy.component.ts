import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss']
})
export class QuienSoyComponent implements OnInit {

  user: any;

  constructor(private api: ApiService) {
    this.api.getUser().subscribe((user) =>{
      this.user = user;
    })
  }

  ngOnInit(): void {
  }

}
