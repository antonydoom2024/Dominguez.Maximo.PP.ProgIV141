import { Component, inject, OnInit } from '@angular/core';
import { AlumnoService } from '../../service/alumno';

@Component({
  selector: 'app-quien-soy',
  imports: [],
  templateUrl: './quien-soy.html',
  styleUrl: './quien-soy.css',
})
export class QuienSoy {
  private alumnoService = inject(AlumnoService);
  alumno = this.alumnoService.getAlumno;

  ngOnInit(): void {
    this.alumnoService.loadAlumno();
  }

  
  
}
