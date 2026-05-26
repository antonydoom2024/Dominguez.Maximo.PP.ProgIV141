import { Injectable, inject, signal,  computed, effect } from "@angular/core";
import { Router } from "@angular/router";
import { SupabaseService } from "./supabase";
import { User } from "../models/models";

@Injectable({providedIn: 'root'})
export class AuthService {
    private router = inject(Router);
    private supabase = inject(SupabaseService);
    
    user = signal<User | null>(null);
    isAutheticated = computed(() => this.user() !== null);
    userEmail = computed(() => this.user()?.email ?? 'Invitado');

    constructor(){
        this.checkSession();
    }

    async checkSession(){
        const {data: { session }} = await this.supabase.getClient().auth.getSession();
        if (session?.user){
            this.user.set({
                id:session.user.id,
                email: session.user.email?? ''
            })
        }
    }

    async login(email: string, password: string):Promise<boolean>{
        const {data, error} = await this.supabase.getClient().auth.signInWithPassword({email, password});
        
        if(error) return false;

        if(data.user){
            this.user.set({id: data.user.id, email: data.user.email ?? ''});
            this.router.navigate(['/home']);
            return true;
        }else{

            return false;
        }
    }

    async signUp(email: string, password: string):Promise<boolean>{
        const { data, error } = await this.supabase.getClient().auth.signUp({email, password})
        
        if(error) return false;

        if(data.user){
            //this.user.set({id: data.user.id, email: data.user.email ?? ''});
            //this.router.navigate(['/home']);
            return true;
        }else{
            return false;
        }
    }

    

}