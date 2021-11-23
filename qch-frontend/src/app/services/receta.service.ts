import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LikeReceta } from '../models/like-receta';
import { Receta } from '../models/receta';

const BACK_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  constructor(private http: HttpClient) {}

  public getAllRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(BACK_URL + 'api/recetas');
  }

  public getReceta(idReceta: number): Observable<Receta> {
    return this.http.get<Receta>(
      BACK_URL + 'api/recetas/receta?idReceta=' + idReceta
    );
  }

  public getRecetasByUsuario(idUsuario: string): Observable<Receta[]> {
    const param = new HttpParams().append('idUsuario', idUsuario);
    return this.http.get<Receta[]>(BACK_URL + 'api/recetas/usuario', {
      params: param,
    });
  }

  public getLikesUsuario(idUsuario: string): Observable<number[]> {
    const param = new HttpParams().append('idUsuario', idUsuario);
    return this.http.get<number[]>(BACK_URL + 'api/recetas/likes-usuario', {
      params: param,
    });
  }

  public like(like: LikeReceta): Observable<any> {
    return this.http.post<any>(BACK_URL + 'api/recetas/like', like);
  }

  public dislike(like: LikeReceta): Observable<any> {
    return this.http.post<any>(BACK_URL + 'api/recetas/dislike', like);
  }
}
