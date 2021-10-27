import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CambiarPasswordPerfil } from '../models/cambiar-password-perfil';
import { PerfilUsuario } from '../models/perfil-usuario';

const BACK_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  public getPerfilUsuario(idUsuario: string): Observable<any> {
    const param = new HttpParams().append('idUsuario', idUsuario);
    return this.http.get<PerfilUsuario>(BACK_URL + 'perfil-usuario', {
      params: param,
    });
  }

  public actualizarPerfilUsuario(
    perfilUsuario: PerfilUsuario
  ): Observable<any> {
    return this.http.post<PerfilUsuario>(
      BACK_URL + 'perfil-usuario/actualizar-datos',
      perfilUsuario
    );
  }

  public cambiarPasswordPerfil(
    cambiarPasswordPerfil: CambiarPasswordPerfil
  ): Observable<any> {
    return this.http.post<PerfilUsuario>(
      BACK_URL + 'perfil-usuario/cambiar-password',
      cambiarPasswordPerfil
    );
  }
}
