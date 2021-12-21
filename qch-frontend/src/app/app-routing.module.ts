import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarPasswordComponent } from './components/cambiar-password/cambiar-password.component';
import { EmailPasswordComponent } from './components/email-password/email-password.component';
import { IndexComponent } from './components/index/index.component';
import { ListaIngredientesComponent } from './components/ingredientes/lista-ingredientes/lista-ingredientes.component';
import { LoginComponent } from './components/login/login.component';
import { MiAlimentacionComponent } from './components/mi-alimentacion/mi-alimentacion.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { EditarRecetaComponent } from './components/recetas/editar-receta/editar-receta.component';
import { ListaRecetasComponent } from './components/recetas/lista-recetas/lista-recetas.component';
import { MisRecetasComponent } from './components/recetas/mis-recetas/mis-recetas.component';
import { NuevaRecetaComponent } from './components/recetas/nueva-receta/nueva-receta.component';
import { RecetaComponent } from './components/recetas/receta/receta.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [AuthGuard] },
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
    path: 'mi-alimentacion',
    component: MiAlimentacionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ingredientes',
    component: ListaIngredientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recetas',
    component: ListaRecetasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'receta/:idReceta',
    component: RecetaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recetas/nueva',
    component: NuevaRecetaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'receta/editar/:idReceta',
    component: EditarRecetaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mis-recetas',
    component: MisRecetasComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
