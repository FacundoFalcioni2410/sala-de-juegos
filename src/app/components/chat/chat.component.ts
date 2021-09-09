import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje } from 'src/app/classes/mensaje';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje: Mensaje = {
    mensaje: '',
    usuario: 'test'
  };

  mensajeE: string = '';
  item$: Observable<any[]>;

  constructor(private chatService: ChatService) {
    this.item$ = chatService.getMessages().valueChanges();
  }

  ngOnInit(): void {
  }

  sendMessage(){
    this.mensaje.mensaje = this.mensajeE;
    console.log(this.mensaje);
    this.chatService.pushMessage(this.mensaje);
    this.mensajeE = '';
  }

}
