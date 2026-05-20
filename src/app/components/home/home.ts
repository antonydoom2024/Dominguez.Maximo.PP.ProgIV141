import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  auth = inject(AuthService);
  usuario = this.auth.userEmail().split("@")[0];
}