import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Home } from './components/home/home';
import { QuienSoy } from './components/quien-soy/quien-soy';
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
            { path: 'quien_soy', component: QuienSoy }]
    },
    { path:'**', redirectTo:'login' }
];