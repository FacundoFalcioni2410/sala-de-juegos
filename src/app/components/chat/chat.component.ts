import { ToastrService } from 'ngx-toastr';
import { Message } from './../../classes/Message';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  messages:any;
  message: Message;
  scrollContainer: any;

  constructor(private chatS: ChatService, public auth: AuthService, private toastr: ToastrService) { 
    this.messages = chatS.items;
    this.message = {
      user: '',
      message: '',
      date: Date().toString(),
    }
  }

  mostrarToast(mensaje: string, titulo?: string) {
    this.toastr.error(mensaje, titulo);
  }

  sendMessage(){
    if(this.message.message.length <= 80){
      this.message.user = this.auth.isLoggedIn.email
      this.message.date = this.getTime();
      // console.log(this.message);
      this.chatS.sendMessage(this.message);
      this.message.message = '';
      this.scrollToBottom();
    }
    else
    {
      this.mostrarToast('Los mensajes no pueden ser mas largos de 80 caracteres', 'Error!');
    }
  }

  getTime(){
    let d = new Date();
    let hour: any = d.getHours();
    let minute: any = d.getMinutes();

    if(d.getHours() < 10)
    {
      hour = '0' + d.getHours();   
    }

    if(d.getMinutes() < 10)
    {
      minute = '0' + d.getMinutes();
    }

    return `${hour}:${minute}`
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }  

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.dir(err);
    }                 
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
