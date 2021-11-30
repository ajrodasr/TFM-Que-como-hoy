import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IngredienteReceta } from '../models/ingrediente-receta';
import { LikeReceta } from '../models/like-receta';
import { Receta } from '../models/receta';
import { TipoReceta } from '../models/tipo-receta';

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

  public getTiposReceta(): Observable<TipoReceta[]> {
    return this.http.get<TipoReceta[]>(BACK_URL + 'api/recetas/tipos');
  }

  public nuevaReceta(receta: Receta): Observable<any> {
    return this.http.post<any>(BACK_URL + 'api/recetas/nueva', receta);
  }

  public editarReceta(receta: Receta): Observable<any> {
    return this.http.post<any>(BACK_URL + 'api/recetas/editar', receta);
  }

  public anadeIngrediente(
    idReceta: number,
    ingrediente: IngredienteReceta
  ): Observable<any> {
    return this.http.post<any>(
      BACK_URL + 'api/recetas/anade-ingrediente?idReceta=' + idReceta,
      ingrediente
    );
  }

  public quitaIngrediente(
    idReceta: number,
    idIngrediente: number
  ): Observable<any> {
    return this.http.post<any>(
      BACK_URL +
        'api/recetas/quita-ingrediente?idReceta=' +
        idReceta +
        '&idIngrediente=' +
        idIngrediente,
      {}
    );
  }

  public publicar(id: number): Observable<any> {
    return this.http.post<any>(
      BACK_URL + 'api/recetas/publicar?idReceta=' + id,
      {}
    );
  }

  public despublicar(id: number): Observable<any> {
    return this.http.post<any>(
      BACK_URL + 'api/recetas/despublicar?idReceta=' + id,
      {}
    );
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

  public uploadImage(image: FormData): Observable<any> {
    return this.http.post<any>(BACK_URL + 'api/recetas/upload-image', image);
  }

  public deleteImage(idReceta: number): Observable<any> {
    return this.http.post<any>(
      BACK_URL + 'api/recetas/delete-image?idReceta=' + idReceta,
      {}
    );
  }
}
