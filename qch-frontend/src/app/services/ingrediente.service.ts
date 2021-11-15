import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GrupoIngrediente } from '../models/grupo-ingrediente';
import { Ingrediente } from '../models/ingrediente';

const BACK_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  constructor(private http: HttpClient) {}

  public getAllIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(BACK_URL + 'api/ingredientes');
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
}
