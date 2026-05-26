import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MayorMenorService } from '../../service/mayor_menor';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-mayor-menor',
  imports: [CommonModule],
  templateUrl: './mayor-menor.html',
  styleUrl: './mayor-menor.css',
})
export class MayorMenor {
  private mayor_menor = inject(MayorMenorService);
  private auth = inject(AuthService);

  palos = ['oro', 'copa', 'espada', 'basto'];

  numeroActual = signal(this.generarNumeroAleatorio());
  paloActual = signal(this.generarPaloAleatorio());
  cant_aciertos = signal(0);                                              //Guardar en BD
  mensaje = signal('¿La siguiente carta será mayor o menor?');
  juegoTerminado = signal(false);

  usuario = this.auth.userEmail().split('@')[0];

  generarNumeroAleatorio(): number {
    return Math.floor(Math.random() * 11) + 1;
  }

  generarPaloAleatorio(): string {
    return this.palos[Math.floor(Math.random() * 3)]
  }

  hacerEleccion(eleccion: 'mayor' | 'menor') {
    const numeroAnterior = this.numeroActual();
    const paloAnterior = this.paloActual();
    const nuevoNumero = this.generarNumeroAleatorio();
    const nuevoPalo = this.generarPaloAleatorio();
    
    this.numeroActual.set(nuevoNumero);
    this.paloActual.set(nuevoPalo);

    const esMayor = nuevoNumero > numeroAnterior;
    const esMenor = nuevoNumero < numeroAnterior;
    
    const acerto = (eleccion === 'mayor' && esMayor) || (eleccion === 'menor' && esMenor);

    if (acerto) {
      this.cant_aciertos.update(p => p + 1);
      this.mensaje.set('¡Acertaste! Sigue jugando');
    } else if (nuevoNumero === numeroAnterior) {
      this.mensaje.set('¡Empate! Misma carta');
    } else {
      this.mensaje.set(`¡Fallaste! La carta anterior era ${numeroAnterior} de ${paloAnterior}`);
      this.juegoTerminado.set(true);
      this.onSubmit();
    }
  }

  reiniciarJuego() {
    this.numeroActual.set(this.generarNumeroAleatorio());
    this.paloActual.set(this.generarPaloAleatorio());
    this.cant_aciertos.set(0);
    this.mensaje.set('¿La siguiente carta será mayor o menor?');
    this.juegoTerminado.set(false);
  }

  async onSubmit() {
    await this.mayor_menor.crearPartida({username: this.usuario, aciertos: this.cant_aciertos()})
  }

}
