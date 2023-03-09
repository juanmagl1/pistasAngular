import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { ListaPistasComponent } from './pistas/lista-pistas/lista-pistas.component';
import { SelectPistaComponent } from './pistas/select-pista/select-pista.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  }  
  ,{
      path:'home',
      component:HomeComponent,
    },
    {
      path:'login',
      component:LoginComponent
    },
    {
      path:'register',
      component:RegisterComponent
    },
    {
      path:'listaPistas/:id',
      component:ListaPistasComponent
    },
    {
      path:'listaPistas/:id/selectPista/:idPista',
      component:SelectPistaComponent
    },
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
