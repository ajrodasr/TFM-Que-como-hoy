import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
