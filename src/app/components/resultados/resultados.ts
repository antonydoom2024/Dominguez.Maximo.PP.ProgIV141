import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoService } from '../../service/ahorcado';
import { MayorMenorService } from '../../service/mayor_menor';
import { PreguntadosService } from '../../service/preguntados';
import { DoblesService } from '../../service/dobles';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css',
})
export class Resultados implements OnInit {
  ahorcado = inject(AhorcadoService);
  mayor_menor = inject(MayorMenorService);
  preguntados = inject(PreguntadosService);
  dobles = inject(DoblesService);

  ngOnInit(): void {
    this.ahorcado.cargarPartida();
    this.mayor_menor.cargarPartida();
    this.preguntados.cargarPartida();
    this.dobles.cargarPartida();
  }

}
