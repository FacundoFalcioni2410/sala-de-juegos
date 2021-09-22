import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Pregunta } from '../../classes/pregunta';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {

  preguntas: Pregunta[] = [];

  error0 = false;
  success0 = false;
  error1 = false;
  success1 = false;
  error2 = false;
  error3 = false;
  success2 = false;
  success3 = false;
  info0 = true;
  info1 = true;
  info2 = true;
  info3 = true;
  seleccionada = false;
  indicePregunta: number = 0;
  preguntaActual: any;
  puntaje: number = 0;
  isRunning: boolean = false;

  constructor(private toaster: ToastrService) {
    this.preguntas = [
      {
        pregunta: '¿Qué famoso filósofo fue maestro de Alejandro Magno durante cinco años?',
        opciones: ['Sócrates', 'Pláton', 'Heráclito', 'Aristóteles'],
        correcta: 3
      },
      {
        pregunta: '¿Cuál es la montaña más alta del continente americano?',
        opciones: ['Monte Fuji', 'Monte Pissis', 'Aconcagua', 'Monte Everest'],
        correcta: 2
      },
      {
        pregunta: '¿Qué inició la Segunda Guerra Mundial?',
        opciones: ['El asesinato del archiduque Francisco Fernando', 'Hitler invadió Austria', 'El asesinato del archiduque Francisco Fernando', 'Alemania invadió Polonia'],
        correcta: 3
      },
      {
        pregunta: '¿Qué volcán devastó Pompeya?',
        opciones: ['Etna', 'Santa Helena', 'Vesubio', 'Kilimanjaro'],
        correcta: 2
      },
      {
        pregunta: '¿Cuál es el orden de los planetas del sistema solar, partiendo desde su centro?',
        opciones: ['Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano, Neptuno, Plutón', 'Venus, Mercurio, Tierra, Júpiter, Urano, Saturno, Neptuno', 'Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano, Neptuno', 'Tierra, Venus, Mercurio, Marte, Urano, Neptuno, Plutón'],
        correcta: 2
      }
    ];
    this.preguntaActual = this.preguntas[this.indicePregunta];
  }

  ngOnInit(): void {
  }

  start(){
    this.isRunning = true;
    this.preguntaActual = this.preguntas[this.indicePregunta];
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

  siguiente(){
    if(this.puntaje < 5)
    {
      this.seleccionada = false;
      this.preguntaActual = this.preguntas[this.indicePregunta];
    }
    else
    {
      this.indicePregunta = 0;
      this.mostrarToast('Has acertado todas las preguntas', 'success');
    }
  }

  respuesta(respuesta: number){
    console.log(respuesta);
    this.seleccionada = true;
    if(respuesta === this.preguntaActual.correcta)
    {
      switch(respuesta)
      {
        case 0:
          this.info0 = false;
          this.success0 = true;
          break;
        case 1:
          this.info1 = false;
          this.success1 = true;
          break;
        case 2:
          this.info2 = false;
          this.success2 = true;
          break;
        case 3:
          this.info3 = false;
          this.success3 = true;
          break;
      }

      this.mostrarToast('Respuesta correcta', 'success');
      this.puntaje++;
      setTimeout(() =>{
        this.indicePregunta++;
        this.siguiente();
        this.resetearColores();
        this.preguntaActual = this.preguntas[this.indicePregunta];
      },500);
    }
    else
    {
      switch(respuesta)
      {
        case 0:
          this.info0 = false;
          this.error0 = true;
          break;
        case 1:
          this.info1 = false;
          this.error1 = true;
          break;
        case 2:
          this.info2 = false;
          this.error2 = true;
          break;
        case 3:
          this.info3 = false;
          this.error3 = true;
          break;
      }
      this.puntaje = 0;
      this.indicePregunta = 0;
      

      this.mostrarToast('Respuesta incorrecta', 'error');
      setTimeout(() => {
        this.resetearColores();
        this.siguiente();
      },500);
    }
  }

  resetearColores(){
    this.success0 = false;
    this.success1 = false;
    this.success2 = false;
    this.success3 = false;
    this.error0 = false;
    this.error1 = false;
    this.error2 = false;
    this.error3 = false;
    this.info0 = true;
    this.info1 = true;
    this.info2 = true;
    this.info3 = true;
  }
}
