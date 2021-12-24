import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CambiarPasswordPerfil } from '../models/cambiar-password-perfil';
import { PerfilUsuario } from '../models/perfil-usuario';

const BACK_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  public getPerfilUsuario(idUsuario: string): Observable<any> {
    const param = new HttpParams().append('idUsuario', idUsuario);
    return this.http.get<PerfilUsuario>(
      BACK_URL + 'api/usuario/perfil-usuario',
      {
        params: param,
      }
    );
  }

  public actualizarPerfilUsuario(
    perfilUsuario: PerfilUsuario
  ): Observable<any> {
    return this.http.post<PerfilUsuario>(
      BACK_URL + 'api/usuario/actualizar-datos',
      perfilUsuario
    );
  }

  public cambiarPasswordPerfil(
    cambiarPasswordPerfil: CambiarPasswordPerfil
  ): Observable<any> {
    return this.http.post<PerfilUsuario>(
      BACK_URL + 'api/usuario/cambiar-password',
      cambiarPasswordPerfil
    );
  }

  public getUsuarios(term: string = '', pageNum: number = 1): Observable<any> {
    const param = new HttpParams()
      .append('term', term)
      .append('pageNum', pageNum.toString());
    return this.http.get<any>(BACK_URL + 'api/usuario/usuarios', {
      params: param,
    });
  }

  public setAdminUsuario(idUsuario: string): Observable<any> {
    return this.http.post<any>(
      BACK_URL + 'api/usuario/set-admin?idUsuario=' + idUsuario,
      {}
    );
  }

  public unsetAdminUsuario(idUsuario: string): Observable<any> {
    return this.http.post<any>(
      BACK_URL + 'api/usuario/unset-admin?idUsuario=' + idUsuario,
      {}
    );
  }
}
