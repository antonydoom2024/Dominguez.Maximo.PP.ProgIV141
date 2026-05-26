import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoService } from '../../service/ahorcado';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css',
})
export class Ahorcado implements OnInit, OnDestroy {
  private ahorcado = inject(AhorcadoService);
  private auth = inject(AuthService);

  palabras: string[] = ['ALGORITMO', 'API', 'ARGUMENTO', 'ARRAY', 'BUCLE', 'BUG', 'CLASE', 
    'CODIGO', 'COMPILADOR', 'DEPURACION', 'FUNCION', 'HERENCIA', 'INTERFAZ', 'LOGICA', 'OBJETO', 
    'PARAMETRO', 'RECURSIVIDAD', 'REPOSITORIO', 'SINTAXIS', 'VARIABLE'];

  abecedario: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  
  palabraSeleccionada: string = '';
  palabraOculta: string = '';
  letrasUsadas: string[] = [];
  fallos: number = 0;
  maxIntentos: number = 6;
  juegoTerminado: boolean = false;
  gano: boolean = false;

  tiempoTranscurrido: number = 0;
  intervaloCronometro: any;
  letrasSeleccionadasContador: number = 0;

  usuario = this.auth.userEmail().split('@')[0];

  ngOnInit(): void {
    this.reiniciarJuego();
  }

  ngOnDestroy(): void {
    this.detenerCronometro();
  }

  reiniciarJuego(): void {
    this.detenerCronometro();
    this.palabraSeleccionada = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraOculta = '_'.repeat(this.palabraSeleccionada.length);
    this.letrasUsadas = [];
    this.fallos = 0;
    this.juegoTerminado = false;
    this.gano = false;
    this.letrasSeleccionadasContador = 0;
    this.tiempoTranscurrido = 0; 
    this.iniciarCronometro();
  }

  adivinarLetra(letra: string): void {
    if (this.juegoTerminado || this.letrasUsadas.includes(letra)) return;

    this.letrasUsadas.push(letra);
    this.letrasSeleccionadasContador++;

    if (this.palabraSeleccionada.includes(letra)) {
      this.actualizarPalabraOculta();
    } else {
      this.fallos++;
      if (this.fallos >= this.maxIntentos) {
        this.juegoTerminado = true;
        this.detenerCronometro();
        console.log(this.tiempoFormateado)
        this.gano = false;
        this.onSubmit();
      }
    }
  }

  actualizarPalabraOculta(): void {
    let palabraTemporal = '';
    for (let i = 0; i < this.palabraSeleccionada.length; i++) {
      if (this.letrasUsadas.includes(this.palabraSeleccionada[i])) {
        palabraTemporal += this.palabraSeleccionada[i];
      } else {
        palabraTemporal += '_';
      }
    }
    this.palabraOculta = palabraTemporal;

    if (!this.palabraOculta.includes('_')) {
      this.juegoTerminado = true;
      this.detenerCronometro();
      //console.log(this.tiempoFormateado)
      this.gano = true;
      this.onSubmit();
    }
  }

  iniciarCronometro(): void {
    this.intervaloCronometro = setInterval(() => {
      this.tiempoTranscurrido++;
    }, 1000);
  }

  detenerCronometro(): void {
    if (this.intervaloCronometro) {
      clearInterval(this.intervaloCronometro);
    }
  }

  get tiempoFormateado(): string {
    const minutos = Math.floor(this.tiempoTranscurrido / 60);
    const segundos = this.tiempoTranscurrido % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }
  
  async onSubmit() {
    await this.ahorcado.crearPartida({username: this.usuario, cant_letras: this.letrasSeleccionadasContador, tiempo: this.tiempoFormateado})
  }

}
