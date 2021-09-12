import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent implements OnInit {

  cards = ['♥', '♣', '♦', '♠'];
  numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; 
  card: string = '';
  nextCard: string = '';
  number: number = 0;
  numberNext: number = 0;
  score: number = 0;
  isRunning: boolean = false;
  isDisabled: boolean = false;
  
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  displayCard(){
    this.isRunning = true;
    this.isDisabled = true;

    let singleCard = this.cards[Math.floor(Math.random() * this.cards.length)];
    let numberAux = this.numbers[Math.floor(Math.random() * this.numbers.length)];

    switch(numberAux)
    {
      case 'J':
        this.number = 10;
        break;
      case 'Q':
        this.number = 11;
        break;
      case 'K':
        this.number = 12;
        break;
      case 'A':
        this.number = 1;
        break;
      default:
        this.number = parseInt(numberAux);
        break;
    }

    this.card = `${this.number} ${singleCard}`;
  }

  proximaCarta(){
    let singleCard = this.cards[Math.floor(Math.random() * this.cards.length)];
    let numberN = this.numbers[Math.floor(Math.random() * this.numbers.length)];

    switch(numberN)
    {
      case 'J':
        this.numberNext = 10;
        break;
      case 'Q':
        this.numberNext = 11;
        break;
      case 'K':
        this.numberNext = 12;
        break;
      case 'A':
        this.numberNext = 1;
        break;
      default:
        this.numberNext = parseInt(numberN);
        break;
    }
    return `${this.numberNext} ${singleCard}`;
  }

  
  mostrarToast(mensaje: string, titulo?: string) {
    this.toastr.error(mensaje, titulo);
  }


  MayorMenor(mayor: boolean)
  {
    let aux = this.proximaCarta();
    console.log('carta actual: ',this.number);
    console.log('proximo numero: ', this.numberNext);
    
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
        this.score = 0;
        this.isDisabled = false;
        this.mostrarToast('HAS PERDIDO', 'FIN DEL JUEGO');
        setTimeout(() => {
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
        this.score = 0;
        this.isDisabled = false;
        this.mostrarToast('HAS PERDIDO', 'FIN DEL JUEGO');
        setTimeout(() => {
          this.card = '';
          this.isRunning = false;
        },1500)
      }
    }
  }

}
