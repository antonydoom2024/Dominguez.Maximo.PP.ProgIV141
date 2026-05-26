import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntadosService } from '../../service/preguntados';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-preguntados',
  imports: [CommonModule],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css',
})
export class Preguntados implements OnInit {
  private preguntadosService = inject(PreguntadosService);
  private auth = inject(AuthService);

  preguntas: any[] = [{type: "multiple", difficulty: "easy", category: "Entertainment: Video Games", question: "Which of these following weapon or equipment exists in Counter Strike but not in Counter Strike: Source?", correct_answer: "Tactical Shield", incorrect_answers: ["Molotov Cocktail", "MP5 Navy", "TMP"]}];

  preguntaActualIndex: number = 0;
  cant_aciertos: number = 0;
  puntuacion: number = 0;
  preguntaSeleccionada: any = null;
  juegoTerminado: boolean = false;
  resultado: string = '';
  answers: string[] = []

  usuario = this.auth.userEmail().split('@')[0];
  
  ngOnInit(): void {
    this.preguntadosService.obtenerPreguntas().subscribe({
      next: (data) => {
        this.preguntas = data;
      },
      error: (err) => console.error('Error al obtener datos:', err)
    });
    this.cargarPregunta();
  }

  cargarPregunta() {
    this.preguntaSeleccionada = this.preguntas[this.preguntaActualIndex];
    this.answers = [this.preguntaSeleccionada.correct_answer, ...this.preguntaSeleccionada.incorrect_answers].sort(() => Math.random() - 0.5);
  }

  seleccionarRespuesta(opcion: string) {
    const esCorrecta = opcion === this.preguntaSeleccionada.correct_answer;
    
    if (esCorrecta) {
      this.puntuacion += 100;
      this.cant_aciertos += 1;
      this.resultado = '¡Respuesta Correcta!';
    } else {
      this.resultado = 'Respuesta Incorrecta. La opcion correcta era: ' + this.preguntaSeleccionada.correct_answer;
    }

    this.siguientePregunta();
  }

  siguientePregunta() {
    this.preguntaActualIndex++;
    if (this.preguntaActualIndex < this.preguntas.length) {
      this.cargarPregunta();
    } else {
      this.juegoTerminado = true;
      this.onSubmit();
    }
  }

  reiniciarJuego() {
    this.preguntaActualIndex = 0;
    this.puntuacion = 0;
    this.cant_aciertos = 0;
    this.juegoTerminado = false;
    this.cargarPregunta();
  }

  async onSubmit() {
    await this.preguntadosService.crearPartida({username: this.usuario, aciertos: this.cant_aciertos, puntaje: this.puntuacion})
  }

}
