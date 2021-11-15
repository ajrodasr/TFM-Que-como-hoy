import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarPasswordComponent } from './components/cambiar-password/cambiar-password.component';
import { EmailPasswordComponent } from './components/email-password/email-password.component';
import { IndexComponent } from './components/index/index.component';
import { IngredienteComponent } from './components/ingredientes/ingrediente/ingrediente.component';
import { ListaIngredientesComponent } from './components/ingredientes/lista-ingredientes/lista-ingredientes.component';
import { NuevoIngredienteComponent } from './components/ingredientes/nuevo-ingrediente/nuevo-ingrediente.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  {
    path: 'email-password',
    component: EmailPasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cambiar-password/:tokenPassword',
    component: CambiarPasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'perfil-usuario',
    component: PerfilUsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ingredientes',
    component: ListaIngredientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ingrediente/:idIngrediente',
    component: IngredienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ingredientes/nuevo',
    component: NuevoIngredienteComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
