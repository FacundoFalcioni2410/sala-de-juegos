import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  getCards(){
    return this.http.get('https://deckofcardsapi.com/api/deck/new/draw/?count=52');
  }

  getUser(){
    return this.http.get('https://api.github.com/users/FacundoFalcioni2410');
  }
}
