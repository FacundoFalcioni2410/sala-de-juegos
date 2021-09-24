import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent implements OnInit {

  cards = ['♥', '♣', '♦', '♠'];
  numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  cardsArray = [];
  card: string = '';
  nextCard: string = '';
  number: number = 0;
  numberNext: number = 0;
  score: number = 0;
  isRunning: boolean = false;
  isDisabled: boolean = false;
  
  constructor(private toastr: ToastrService, private http: ApiService) {
    this.http.getCards().subscribe( (cards: any) =>{
      console.log(cards);
      this.cardsArray = cards.cards;
    })
  }

  ngOnInit(): void {
  }

  displayCard(){
    this.isRunning = true;
    this.isDisabled = true;

    let singleCard: any = this.cardsArray[Math.floor(Math.random() * this.cardsArray.length)];
    let numberAux: any = singleCard.value;

    switch(numberAux)
    {
      case '0':
        this.number = 10;
        break;
      case 'JACK':
        this.number = 11;
        break;
      case 'QUEEN':
        this.number = 12;
        break;
      case 'KING':
        this.number = 13;
        break;
      case 'ACE':
        this.number = 1;
        break;
      default:
        this.number = parseInt(numberAux);
        break;
    }
    this.card = singleCard.image;
  }

  proximaCarta(){
    let singleCard: any = this.cardsArray[Math.floor(Math.random() * this.cardsArray.length)];
    let numberAux: any = singleCard.value;


    switch(numberAux)
    {
      case 0:
        this.numberNext = 10;
        break;
      case 'JACK':
        this.numberNext = 11;
        break;
      case 'QUEEN':
        this.numberNext = 12;
        break;
      case 'KING':
        this.numberNext = 13;
        break;
      case 'ACE':
        this.numberNext = 1;
        break;
      default:
        this.numberNext = parseInt(numberAux);
        break;
    }
    return singleCard.image;
  }

  
  mostrarToast(mensaje: string, titulo?: string) {
    this.toastr.error(mensaje, titulo);
  }


  MayorMenor(mayor: boolean)
  {
    let aux = this.proximaCarta();
    
    this.card = aux;

    if(mayor)
    {
      if(this.numberNext >= this.number)
      {
        this.score++;
        this.number = this.numberNext;
      }
      else
      {        
        this.isDisabled = false;
        this.mostrarToast('HAS PERDIDO', 'FIN DEL JUEGO');
        setTimeout(() => {
          this.score = 0;
          this.card = '';
          this.isRunning = false;
        },1500)
      }
    }
    else
    {
      if(this.numberNext <= this.number)
      {
        this.score++;
        this.number = this.numberNext;
      }
      else
      {
        this.isDisabled = false;
        this.mostrarToast('HAS PERDIDO', 'FIN DEL JUEGO');
        setTimeout(() => {
          this.score = 0;
          this.card = '';
          this.isRunning = false;
        },1500)
      }
    }
  }

}