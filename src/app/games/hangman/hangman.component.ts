import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {

  letras: string[];
  palabras: string[];
  palabraSeleccionada: string = '';
  espacios: string[];
  intentos: number;
  imagen: string;
  arrayImagen: string[];
  isRunning: boolean;
  letrasUsadas: string[];
  letrasErradas: string[];

  constructor(private toastr: ToastrService) {
    this.letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L','M','N','O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.palabras = ['Pixel','Cono', 'Teclado', 'Cerradura'];
    this.espacios = [];
    this.intentos = 0;
    this.arrayImagen = [
      '../../assets/0.jpg',
      '../../assets/1.jpg',
      '../../assets/2.jpg',
      '../../assets/3.jpg',
      '../../assets/4.jpg',
      '../../assets/5.jpg',
      '../../assets/6.jpg'
    ]
    this.imagen = '../../assets/0.jpg'
    this.isRunning = false;
    this.letrasUsadas = Array();
    this.letrasErradas = Array();
  }

  ngOnInit(): void {
  }

  generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
      `<button
          class="btn btn-lg btn-primary m-2"
          id='` + letter + `' (click)=this.cambiarEspacio('` + letter + `')>
          ` + letter + `</button>`).join('');
  
    document.getElementById('keyboard')!.innerHTML = buttonsHTML;
  }

  asignarCantidad(){
    try{
      this.espacios = Array(this.palabraSeleccionada.length).fill('_');
    }
    catch(err)
    {
      console.dir(err);
    }
  }


 
  getIndicesOf(searchStr: string, str: string, caseSensitive: boolean) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices:any = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
  }

  randomWord(){
    this.isRunning = true;
    this.palabraSeleccionada = this.palabras[Math.round(Math.random()*(this.palabras.length - 0))];
      this.asignarCantidad();
      // this.generateButtons();
    }

  mostrarToast(mensaje: string, titulo?: string) {
    this.toastr.error(mensaje, titulo);
  }

  cambiarEspacio(letra: string){
    console.log(letra);
    if(this.isRunning && this.letrasUsadas.indexOf(letra) === -1)
    {
      let indices: number[] = this.getIndicesOf(letra, this.palabraSeleccionada, false);
      if(indices.length === 0 && this.isRunning)
      {
        this.intentos++;
        if(this.intentos <= 6)
        {
          this.imagen = this.arrayImagen[this.intentos];
        }

        if(this.intentos === 6)
        {
          this.mostrarToast('HAS PERDIDO', 'FIN DEL JUEGO');
          setTimeout(() => {
            this.reiniciar();
          },2000);
        }

      }
      else if(indices.length > 0 && this.isRunning)
      {
        this.letrasUsadas.push(letra);
        for(let indice of indices)
        {
          this.espacios[indice] = letra;
        }
        this.ganarJuego();
      }
    }
    else if(this.isRunning)
    {
      this.mostrarToast('Ya acertaste esa letra', 'CUIDADO!');
    }
  }

  ganarJuego(){
    if(this.espacios.indexOf('_') === -1 && this.isRunning)
    {
      this.toastr.success('GANASTE!', 'FELICITACIONES');
      setTimeout(() => {
        this.reiniciar();
      },2000);
    }
  }

  reiniciar(){
    this.isRunning = false;
    this.letrasUsadas = Array();
    this.palabraSeleccionada = '';
    this.espacios = [];
    this.intentos = 0;
    this.imagen = this.arrayImagen[0];
  }
}
