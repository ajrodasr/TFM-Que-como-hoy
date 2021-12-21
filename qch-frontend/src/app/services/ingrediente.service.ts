import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoIngrediente } from '../models/grupo-ingrediente';
import { GrupoIngredienteConsumido } from '../models/grupo-ingrediente-consumido';
import { Ingrediente } from '../models/ingrediente';

const BACK_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  constructor(private http: HttpClient) {}

  public getAllIngredientes(
    idGrupo: number = -1,
    term: string = '',
    pageNum: number = 0
  ): Observable<any> {
    const parametros: string[] = [];

    if (term !== '') {
      parametros.push(`term=${term}&`);
    }

    if (idGrupo >= 0) {
      parametros.push(`idGrupo=${idGrupo}&`);
    }

    if (pageNum !== 0) {
      parametros.push(`pageNum=${pageNum}&`);
    }

    let urlConsulta = BACK_URL + 'api/ingredientes';

    if (parametros.length > 0) {
      urlConsulta += '?';
      parametros.forEach((parametro) => {
        urlConsulta += parametro;
      });
    }
    return this.http.get<any>(urlConsulta);
  }

  public getIngredientesById(idIngrediente: number): Observable<Ingrediente> {
    const param = new HttpParams().append(
      'idIngrediente',
      idIngrediente.toString()
    );
    return this.http.get<Ingrediente>(
      BACK_URL + 'api/ingredientes/ingrediente',
      {
        params: param,
      }
    );
  }

  public getIngredientesFilterNombre(term: string): Observable<Ingrediente[]> {
    const param = new HttpParams().append('term', term);
    return this.http.get<Ingrediente[]>(BACK_URL + 'api/ingredientes/filter', {
      params: param,
    });
  }

  public getIngredientesMasUsadosUsuario(
    idUsuario: string
  ): Observable<Ingrediente[]> {
    const param = new HttpParams().append('idUsuario', idUsuario);
    return this.http.get<Ingrediente[]>(
      BACK_URL + 'api/ingredientes/mas-usados-usuario',
      {
        params: param,
      }
    );
  }

  public getIngredientesByGrupo(idGrupo: number): Observable<Ingrediente[]> {
    const param = new HttpParams().append('idGrupo', idGrupo.toString());
    return this.http.get<Ingrediente[]>(BACK_URL + 'api/ingredientes', {
      params: param,
    });
  }

  public nuevoIngrediente(ingrediente: Ingrediente): Observable<any> {
    return this.http.post<any>(
      BACK_URL + 'api/ingredientes/nuevo',
      ingrediente
    );
  }

  public actualizarIngrediente(ingrediente: Ingrediente): Observable<any> {
    return this.http.post<any>(
      BACK_URL + 'api/ingredientes/actualizar',
      ingrediente
    );
  }

  public getGrupos(): Observable<GrupoIngrediente[]> {
    return this.http.get<GrupoIngrediente[]>(
      BACK_URL + 'api/ingredientes/grupos'
    );
  }

  public getGruposConsumidos(
    idUsuario: string
  ): Observable<GrupoIngredienteConsumido[]> {
    const param = new HttpParams().append('idUsuario', idUsuario);
    return this.http.get<GrupoIngredienteConsumido[]>(
      BACK_URL + 'api/ingredientes/grupos-consumidos',
      {
        params: param,
      }
    );
  }
}
