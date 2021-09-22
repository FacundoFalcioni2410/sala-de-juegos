import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-black-jack',
  templateUrl: './black-jack.component.html',
  styleUrls: ['./black-jack.component.scss']
})
export class BlackJackComponent implements OnInit {

  constructor(private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  money: any = 100;
  deck: any = [];
  dealercards: any = [];
  playercards: any = [];
  dealersuits: any = [];
  playersuits: any = [];
  bet: any = 0;
  elems: any = document.getElementsByClassName('debutton');

//Deal button clicked
 deal(playerbet: any) {
  //make sure player has enough money to play
  if(playerbet > this.money){
    this.mostrarToast(`No tienes suficiente dinero para apostar, actualmente tienes ${this.money}`,'error');
    return true;
  }
  this.deck = [];
  this.dealercards = [];
  this.playercards = [];
  this.pullcard(0);
  this.pullcard(0);
  this.pullcard(1);
  this.pullcard(1);
  //transfers the bet amount to the bet variable
  this.bet = playerbet;
  //Sets play buttons back to visable and hides bet buttons
  document.getElementById("ddbutton")!.style.visibility = "visible";
  document.getElementById("stbutton")!.style.visibility = "visible";
  document.getElementById("htbutton")!.style.visibility = "visible";
  //elementclasses are stupid and return a set, so i have to iterate through the array to hide them all
  for(var i = 0; i != this.elems.length; ++i)
  {
    this.elems[i].style.visibility = "hidden"; 
  }
  //changes under message to display the bet amount
  //takes bet amount from money
  this.money -= this.bet;
  //updates money html
  document.getElementById("playermoney")!.innerHTML = "$" + this.money;
  //updates double down cost
  document.getElementById("ddbutton")!.innerHTML = "Redoblar la apuesta -$" + this.bet;
  return false;
}

//pulls a card for 0 (dealer) or 1 (player)
 pullcard(playernum: any) {
  let keepgoing: any = true;
  let cardpull: any;
  let suit: any;
  let value: any = 0;
  //makes sure all cards haven't been played yet.
  if (this.deck.length < 52) {
    while (keepgoing) {
      cardpull = Math.floor((Math.random() * 52) + 1);
      keepgoing = false;
      //checks to see if that card was pulled from the deck previously
      for (let i = 0; i < this.deck.length; i++) {
        if (cardpull == this.deck[i]) {
          keepgoing = true;
        }
      }
    }
    this.deck.push(cardpull);
    //checks the suit of the card
    if (cardpull <= 13) {
      suit = "@"
    } else if (cardpull <= 26) {
      suit = "*"
      cardpull -= 13;
    } else if (cardpull <= 39) {
      suit = "%"
      cardpull -= 26;
    } else if (cardpull <= 52) {
      suit = "!"
      cardpull -= 39;
    }
    //checks who the game is pulling cards for and pushes the card value and suit into the arrays
    if (playernum == 0) {
      this.dealercards.push(cardpull);
      this.dealersuits.push(suit);
      //player can't know the value of the dealer's cards, replace with a -- placeholder
      if (this.dealercards.length > 1) {
        var passcards: any = this.dealercards.slice(1, 2);
        var passsuits: any = this.dealersuits.slice(1, 2);
        document.getElementById("dealercards")!.innerHTML = this.drawcards(passcards, this.dealersuits);
      }

    }
    if (playernum == 1) {
      this.playercards.push(cardpull);
      this.playersuits.push(suit);
      document.getElementById("playerscore")!.innerHTML = this.calcscore(this.playercards).toString();
      document.getElementById("playercards")!.innerHTML = this.drawcards(this.playercards, this.playersuits);
    }
    return true;
  }
  return "ERROR";
}

//hit button clicked
 hit() {
  //adds a card for the player
  this.pullcard(1);
  document.getElementById("ddbutton")!.style.visibility = "hidden";
  //calculate the score to see if the game is over
  if (this.calcscore(this.playercards) > 21) {
    this.stand();
  }

}

mostrarToast(mensaje: string, tipo: string) {
  if(tipo === 'error')
  {
    this.toaster.error(mensaje);
  }
  else if(tipo === 'success')
  {
    this.toaster.success(mensaje);
  }
}

//stand button clicked (ends round)
 stand() {
  //hides play buttons, reveals bet buttons
  document.getElementById("ddbutton")!.style.visibility = "hidden";
  document.getElementById("stbutton")!.style.visibility = "hidden";
  document.getElementById("htbutton")!.style.visibility = "hidden";
  for(var i = 0; i != this.elems.length; ++i)
  {
    this.elems[i].style.visibility = "visible"; // hidden has to be a string
  }
  //plays the dealer's turn, hits up to 17 then stands
  this.dealerplay();
  
  //calculates the scores and compares them
  var playerend = this.calcscore(this.playercards);
  var dealerend = this.calcscore(this.dealercards);
  if (playerend > 21) {
    this.mostrarToast('PERDISTE, TE PASASTE DE 21', 'error');
  } else if (dealerend > 21 || playerend > dealerend) {
    this.mostrarToast(`GANASTE $${2 * this.bet}`, 'success');
    this.money += 2 * this.bet;
  } else if (dealerend == playerend) {
    this.mostrarToast(`"Empate $${this.bet}`, 'success');
    this.money += this.bet;
  } else {
    this.mostrarToast(`El crupier gano`, 'error');
  }
  document.getElementById("playermoney")!.innerHTML = "$" + this.money;
}

//double down button clicked, hits once then immediately stands after doubling the bet.
 doubledown() {
  //makes sure the player have enough money to double down
  if(this.money < this.bet){
    this.mostrarToast('No tienes suficiente dinero para redoblar la apuesta', 'error');
    return true;
  }
  //doubles the bet
  this.money -= this.bet;
  this.bet *= 2;
  this.hit();
  this.stand();

  return false;
}

//called once a stand() is reached, could shove this code in stand as that's the only time it's called, but I kind of like it seperate
 dealerplay() {
  while (this.calcscore(this.dealercards) < 17) {
    this.pullcard(0);
  }
  document.getElementById("dealerscore")!.innerHTML = this.calcscore(this.dealercards).toString();
  document.getElementById("dealercards")!.innerHTML = this.drawcards(this.dealercards, this.dealersuits);
}

//takes in an array of card values and calculates the score
 calcscore(cards: any) {
  var aces = 0;
  var endscore = 0;

  //count cards and check for ace
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] == 1 && aces == 0) {
      aces++;
    } else { //if it's not an ace
      if (cards[i] >= 10) {
        endscore += 10;
      } else {
        endscore += cards[i];
      }
    }
  }

  //add ace back in if it existed
  if (aces == 1) {
    if (endscore + 11 > 21) {
      endscore++;
    } else {
      endscore += 11;
    }
  }
  return endscore;
}

//ascii drawing, takes the number of cards in the array and draws 5 lines
 drawcards(cards: any, suits: any) {
  var lines = ["", "", "", "", ""];
  let type = ['♥', '♣', '♦', '♠'];

  //2nd line (contains value)
  for (let i = 0; i < cards.length; i++) {
    lines[1] += ' ';
    lines[1] += this.cardvalue(cards[i]);
    lines[1] +=  type[Math.floor(Math.random() * type.length)];
    // lines[1] += ' - ';
  }

  lines[1] += "</br>";




  return lines[0] + lines[1]  +  lines[4];
}

//fixes for ace jack queen and king cards from their 1 11 12 13 values, used for drawing ascii
 cardvalue(cardnum: number) {
  if (cardnum == 1) {
    return "A";
  }
  if (cardnum == 11) {
    return "J";
  }
  if (cardnum == 12) {
    return "Q";
  }
  if (cardnum == 13) {
    return "K";
  } else return cardnum;
}

}
