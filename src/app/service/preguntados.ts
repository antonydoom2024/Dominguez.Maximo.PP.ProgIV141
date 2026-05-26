import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase';
import { PartidaPreguntados } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {
  private http = inject(HttpClient);
  private apiPreguntados = 'https://opentdb.com/api.php?amount=18&type=multiple';

  private supabase = inject(SupabaseService);
  
  partidas = signal<PartidaPreguntados[]>([]);
  loading  = signal(false);
  error = signal<string | null>(null);

  obtenerPreguntas(): Observable<any[]> {
    return this.http.get<any>(this.apiPreguntados).pipe(
      map(response => response.results)
    );
  }

  async cargarPartida(){
        this.loading.set(true);
        this.error.set(null);
        const {data, error} = await this.supabase.getClient().from('preguntados').select('*').order('puntaje', {ascending: false});
        //console.log(data);
        if (error){
            this.error.set(error.message);
        }else{
            this.partidas.set(data ?? []);
        }
        this.loading.set(false);
    }

    async crearPartida(partida: Omit<PartidaPreguntados, 'id' | 'created_at'>){
        const {data, error} = await this.supabase.getClient().from('preguntados').insert([partida]);
        
        if(!error){
            await this.cargarPartida();
        }
        return !error;
    }
}