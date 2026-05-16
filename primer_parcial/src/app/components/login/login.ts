import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);

  email =  '';
  password = '';

  onSubmit():void{
    console.log(`Login: `, this.email, this.password);
    this.router.navigate(['/home']);
  }

}
