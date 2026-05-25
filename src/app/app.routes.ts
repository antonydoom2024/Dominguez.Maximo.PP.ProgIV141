import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Home } from './components/home/home';
import { QuienSoy } from './components/quien-soy/quien-soy';
import { Ahorcado } from './components/ahorcado/ahorcado';
import { MayorMenor } from './components/mayor-menor/mayor-menor';
import { Preguntados } from './components/preguntados/preguntados';
import { DadoMayor } from './components/dado-mayor/dado-mayor';
import { Chat } from './components/chat/chat';
import { Layout } from './components/layout/layout';
import { authGuard } from './guards/auth';

export const routes: Routes = [
    
    { path: 'login', component: Login },
    { path: 'registro', component: Registro },
    {
        path: '',
        component: Layout,
        canActivate:[authGuard],
        children:[
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: Home },
            { path: 'quien_soy', component: QuienSoy },
            { path: 'ahorcado', component: Ahorcado },
            { path: 'mayor_menor', component: MayorMenor },
            { path: 'preguntados', component: Preguntados },
            { path: 'dado_mayor', component: DadoMayor },
            { path: 'chat', component: Chat}]
    },
    { path:'**', redirectTo:'login' }
];