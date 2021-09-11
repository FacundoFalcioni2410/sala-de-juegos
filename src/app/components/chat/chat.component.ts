import { Message } from './../../classes/Message';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages:any;
  message: Message;

  constructor(private chatS: ChatService, public auth: AuthService) { 
    this.messages = chatS.items;
    this.message = {
      user: '',
      message: '',
      date: Date().toString(),
    }
  }

  sendMessage(){
    let d: Date = new Date();
    this.message.user = this.auth.isLoggedIn.email
    this.message.date = d.getHours() + ':' + d.getMinutes(),
    console.log(this.message);
    this.chatS.sendMessage(this.message);
    this.message.message = '';
  }

  ngOnInit(): void {
  }

}
//   messageInput: string = '';

//   constructor(private chatService: ChatService, public auth: AuthService) {
  //   }
  
  //   ngOnInit(): void {
    //   }
    
     

//   sendMessage(){
//     let d: Date = new Date();
//     let auxMessage: Message = {
//       message: this.messageInput,
//       user: this.auth.isLoggedIn.email,
//       date: d.getHours() + ':' + d.getMinutes(),
//     }
//     console.log(this.messageInput);
//     this.chatService.sendMessage(auxMessage);
//     this.messageInput = '';
//   }

// }
