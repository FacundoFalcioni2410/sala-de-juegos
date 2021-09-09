import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Mensaje } from '../classes/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  collectionRoute: string = '/chat'
  refCollection: AngularFireList<Mensaje>;

  constructor(private bd: AngularFireDatabase) {
    this.refCollection = bd.list(this.collectionRoute);
  }

  pushMessage(mensaje: any){
    return this.refCollection.push(mensaje);
  }

  getMessages(): AngularFireList<Mensaje>{
    return this.refCollection;
  }
}
