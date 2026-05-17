import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  email =  '';
  name =  '';
  surname =  '';
  age =  '';
  password = '';

  onSubmit():void{
    console.log(`Registro: `, this.email, this.name, this.surname, this.age, this.password);
  }

}
