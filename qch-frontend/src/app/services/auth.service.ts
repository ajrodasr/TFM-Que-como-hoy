import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CambiarPassword } from '../models/cambiar-password';
import { EmailPassword } from '../models/email-password';
import { JwtDto } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

const TOKEN_KEY = 'AuthToken';
const BACK_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getUsername(): string | null {
    const token = this.getToken();

    if (token == null || !this.isLogged()) {
      return null;
    }

    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    return values.sub;
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public isAdmin(): boolean {
    const token = this.getToken();

    if (!token || !this.isLogged()) {
      return false;
    }

    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  public logOut(): void {
    window.sessionStorage.clear();
    window.location.href = '/';
  }

  public registro(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(BACK_URL + 'auth/registro', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.http.post<JwtDto>(BACK_URL + 'auth/login', loginUsuario);
  }

  public refresh(jwdto: JwtDto): Observable<JwtDto> {
    return this.http.post<JwtDto>(BACK_URL + 'auth/refresh', jwdto);
  }

  public enviarEmailPassword(emailPassword: EmailPassword): Observable<any> {
    return this.http.post<any>(BACK_URL + 'auth/email-password', emailPassword);
  }

  public cambiarPassword(cambiarPassword: CambiarPassword): Observable<any> {
    return this.http.post<any>(
      BACK_URL + 'auth/cambiar-password',
      cambiarPassword
    );
  }
}
