import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Alumno } from '../models/alumno.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {

  private http = inject(HttpClient);
  private apiAlumno = 'https://api.github.com/users/antonydoom2024';

  alumno = signal<Alumno>({id: 0, login: 'example', name: 'example', avatar_url: '', isActive: true, created_at: new Date()});
  loading = signal(false);
  error = signal<string | null>(null);

  loadAlumno(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Alumno>(this.apiAlumno).subscribe({
      next: (data) => {
        const transformed = {
          id: data.id,
          login: data.login,
          name: data.name,
          avatar_url: data.avatar_url,
          isActive: true,
          created_at: new Date(data.created_at)
        };
        
        this.alumno.set(transformed);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set("error al cargar usuario");
        this.loading.set(false);
      }
    });
  }


  getAlumno = computed (() => {
    return this.alumno();
  });


}
