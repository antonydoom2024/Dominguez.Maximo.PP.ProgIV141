import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);

  email = '';
  password = '';
  loading = signal(false);
  errorMensaje = signal('');

  async onSubmit(){
    this.loading.set(true);
    const success = await this.auth.login(this.email, this.password);
    if(!success) this.errorMensaje.set('Credenciales incorrectas');
    this.loading.set(false);
  }

  async acceso1(){
    await this.auth.login('eliasvilla@gmail.com', '123456');
  }

  async acceso2(){
    await this.auth.login('sebastianperez@gmail.com', '123456');
  }

  async acceso3(){
    await this.auth.login('sofiarodriguez@gmail.com', '123456');
  }

}