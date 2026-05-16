import { Component, inject, OnInit } from '@angular/core';
import { AlumnoService } from '../../service/alumno';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-quien-soy',
  imports: [RouterLink],
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
