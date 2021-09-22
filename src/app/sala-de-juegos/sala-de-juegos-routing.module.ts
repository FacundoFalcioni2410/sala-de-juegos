import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from '../games/hangman/hangman.component';
import { MayorMenorComponent } from '../games/mayor-menor/mayor-menor.component';
import { SalaDeJuegosComponent } from './sala-de-juegos.component';
import { BlackJackComponent } from '../games/black-jack/black-jack.component';
import { PreguntadosComponent } from '../games/preguntados/preguntados.component';

const routes: Routes = [
  {path: '', component: SalaDeJuegosComponent},
  {path: 'ahorcado', component: HangmanComponent},
  {path: 'mayor-menor', component: MayorMenorComponent},
  {path: 'blackjack', component: BlackJackComponent},
  {path: 'preguntados', component: PreguntadosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaDeJuegosRoutingModule { }
