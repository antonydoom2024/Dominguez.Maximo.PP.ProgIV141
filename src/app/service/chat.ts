import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase';
import { Mensaje } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private supabase = inject(SupabaseService);
    public mensajes = signal<Mensaje[]>([]);

    constructor() {
        this.cargarMensajesIniciales();
        this.escucharMensajesEnTiempoReal();
    }

    async cargarMensajesIniciales() {
        const { data } = await this.supabase.getClient()
        .from('mensajes')
        .select('*, usuarios(username)')
        .order('created_at', { ascending: true });

        if (data) this.mensajes.set(data as Mensaje[]);
    }

    escucharMensajesEnTiempoReal() {
        this.supabase.getClient()
        .channel('sala-publica')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes' }, 
        async (payload) => {
            this.cargarMensajesIniciales(); 
        })
        .subscribe();
    }

    async enviarMensajeConUsuario(contenido: string, username: string) {
        const { data: usuarios } = await this.supabase.getClient()
        .from('usuarios')
        .select('id')
        .eq('username', username);

        let userId: number;

        if (!usuarios || usuarios.length === 0) {
            const { data: nuevoUsuario, error } = await this.supabase.getClient()
            .from('usuarios')
            .insert({ username })
            .select()
            .single();

            if (error) {
                console.error("Error creando usuario:", error);
                return;
            }
            userId = nuevoUsuario.id;
        } else {
            userId = usuarios[0].id;
        }

        await this.supabase.getClient().from('mensajes').insert({
            contenido,
            user_id: userId
        });
    }
}