import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaDeJuegosRoutingModule } from './sala-de-juegos-routing.module';
import { SalaDeJuegosComponent } from './sala-de-juegos.component';


@NgModule({
  declarations: [
    SalaDeJuegosComponent
  ],
  imports: [
    CommonModule,
    SalaDeJuegosRoutingModule
  ]
})
export class SalaDeJuegosModule { }
