import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from '../games/hangman/hangman.component';
import { SalaDeJuegosComponent } from './sala-de-juegos.component';

const routes: Routes = [
  { path: '', component: SalaDeJuegosComponent },
  {path: 'ahorcado', component: HangmanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaDeJuegosRoutingModule { }
