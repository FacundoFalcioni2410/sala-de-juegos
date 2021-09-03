import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() color: string;
  @Input() mensaje: string;
  
  constructor() {
    this.color = '';
    this.mensaje = '';
  }

  ngOnInit(): void {
  }

}
