import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EmailPasswordComponent } from './components/email-password/email-password.component';
import { CambiarPasswordComponent } from './components/cambiar-password/cambiar-password.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { interceptorProvider } from './interceptors/auth-interceptor.service';
import { ListaIngredientesComponent } from './components/ingredientes/lista-ingredientes/lista-ingredientes.component';
import { ListaRecetasComponent } from './components/recetas/lista-recetas/lista-recetas.component';
import { RecetaComponent } from './components/recetas/receta/receta.component';
import { FooterComponent } from './components/footer/footer.component';
import { MisRecetasComponent } from './components/recetas/mis-recetas/mis-recetas.component';
import { NuevaRecetaComponent } from './components/recetas/nueva-receta/nueva-receta.component';
import { EditarRecetaComponent } from './components/recetas/editar-receta/editar-receta.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MenuComponent,
    LoginComponent,
    RegistroComponent,
    EmailPasswordComponent,
    CambiarPasswordComponent,
    PerfilUsuarioComponent,
    ListaIngredientesComponent,
    ListaRecetasComponent,
    RecetaComponent,
    FooterComponent,
    MisRecetasComponent,
    NuevaRecetaComponent,
    EditarRecetaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
