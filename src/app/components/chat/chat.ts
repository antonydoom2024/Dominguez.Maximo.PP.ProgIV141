import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth';
import { ChatService } from '../../service/chat';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  auth = inject(AuthService);
  chatService = inject(ChatService);
  nuevoMensaje = '';
  usuario = this.auth.userEmail().split("@")[0];
  
  async enviar() {
    //console.log(this.chatService.mensajes())
    const nombre = this.usuario.trim();
    const texto = this.nuevoMensaje.trim();

    if (nombre && texto) {
      await this.chatService.enviarMensajeConUsuario(texto, nombre);
      this.nuevoMensaje = '';
    }
  }
}
