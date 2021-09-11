import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  items: Observable<any[]>;
  chatDb = '/chat';

  constructor(private fireDB: AngularFireDatabase) {
    this.items = fireDB.list(this.chatDb).valueChanges();
  }

  sendMessage(message :any){
    const itemsRef = this.fireDB.list(this.chatDb);
    itemsRef.push(message);
  }

}