import { Injectable, inject, signal,  computed } from "@angular/core";
import { SupabaseService } from "./supabase";
import { PartidaAhorcado } from "../models/models";

@Injectable({providedIn: 'root'})
export class AhorcadoService {
   
    private supabase = inject(SupabaseService);

    partidas = signal<PartidaAhorcado[]>([]);
    loading  = signal(false);
    error = signal<string | null>(null);

    async cargarPartida(){
        this.loading.set(true);
        this.error.set(null);
        const {data, error} = await this.supabase.getClient().from('ahorcado').select('*').order('created_at', {ascending: false});
        //console.log(data);
        if (error){
            this.error.set(error.message);
        }else{
            this.partidas.set(data ?? []);
        }
        this.loading.set(false);
    }

    async crearPartida(partida: Omit<PartidaAhorcado, 'id' | 'created_at'>){
        
        const {data, error} = await this.supabase.getClient().from('ahorcado').insert([partida]);
        
        if(!error){
            await this.cargarPartida();
        }
        return !error;
    }

}