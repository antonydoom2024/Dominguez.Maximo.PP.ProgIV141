import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  private auth = inject(AuthService);

  email =  '';
  name =  '';
  surname =  '';
  age =  '';
  password = '';

  loading = signal(false);
  mensaje = signal('');

  async onSubmit(){
    this.loading.set(true);
    const success = await this.auth.signUp(this.email, this.password);
    if(success) this.mensaje.set('Registrado correctamente');
    this.loading.set(false);
    //console.log(`Registro: `, this.email, this.name, this.surname, this.age, this.password);
  }

}
