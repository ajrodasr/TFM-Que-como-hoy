import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

const TOKEN_KEY = 'AuthToken';
const BACK_URL = 'http://localhost:8080/';

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
    this.router.navigate(['/']);
  }

  public registro(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(
      BACK_URL + 'auth/registro',
      JSON.parse(JSON.stringify(nuevoUsuario))
    );
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.http.post<JwtDto>(BACK_URL + 'auth/login', loginUsuario);
  }

  public refresh(jwdto: JwtDto): Observable<JwtDto> {
    return this.http.post<JwtDto>(BACK_URL + 'auth/refresh', jwdto);
  }
}
