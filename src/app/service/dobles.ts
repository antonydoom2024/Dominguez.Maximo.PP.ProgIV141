import { Injectable, inject, signal,  computed } from "@angular/core";
import { SupabaseService } from "./supabase";
import { PartidaDobles } from "../models/models";

@Injectable({providedIn: 'root'})
export class DoblesService {
    private supabase = inject(SupabaseService);

    partidas = signal<PartidaDobles[]>([]);
    loading  = signal(false);
    error = signal<string | null>(null);

    async cargarPartida(){
        this.loading.set(true);
        this.error.set(null);
        const {data, error} = await this.supabase.getClient().from('dobles').select('*').order('tiradas', {ascending: true});

        if (error){
            this.error.set(error.message);
        }else{
            this.partidas.set(data ?? []);
        }
        this.loading.set(false);
    }

    async crearPartida(partida: Omit<PartidaDobles, 'id' | 'created_at'>){
        const {data, error} = await this.supabase.getClient().from('dobles').insert([partida]);
        
        if(!error){
            await this.cargarPartida();
        }
        return !error;
    }

}