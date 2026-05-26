import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoblesService } from '../../service/dobles';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-dobles',
  imports: [CommonModule],
  templateUrl: './dobles.html',
  styleUrl: './dobles.css',
})
export class Dobles {
  private dobles = inject(DoblesService);
  private auth = inject(AuthService);

  dadoIzquierdo: string = '/images/dado/dice1.png';
  dadoDerecho: string = '/images/dado/dice4.png';

  numero1: number = 1;
  numero2: number = 2;
  tiradas: number = 0;
  juegoTerminado: boolean = false;

  usuario = this.auth.userEmail().split('@')[0];

  tirarDados(){
    this.numero1 = Math.round(Math.random() * 5) + 1 ;
    this.numero2 = Math.round(Math.random() * 5) + 1;
    this.tiradas += 1;

    this.actualizarDados();

    if (this.numero1 === this.numero2) {
      this.juegoTerminado = true;
      this.onSubmit();
    }
  }

  actualizarDados(): void {
    this.dadoIzquierdo = '/images/dado/dice' + this.numero1 + '.png';
    this.dadoDerecho = '/images/dado/dice' + this.numero2 + '.png';
  }

  reiniciarJuego(): void {
    this.numero1 = 1;
    this.numero2 = 2;
    this.tiradas = 0;
    this.juegoTerminado = false;
    this.actualizarDados();
  }

  async onSubmit() {
    await this.dobles.crearPartida({username: this.usuario, tiradas: this.tiradas})
  }

}