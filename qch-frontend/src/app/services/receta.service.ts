import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingrediente } from '../models/ingrediente';
import { IngredienteReceta } from '../models/ingrediente-receta';
import { LikeReceta } from '../models/like-receta';
import { Receta } from '../models/receta';
import { RecetaConsumida } from '../models/receta-consumida';
import { RecetaLista } from '../models/receta-lista';
import { TipoReceta } from '../models/tipo-receta';
import { UsuarioReceta } from '../models/usuario-receta';

const BACK_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  constructor(private http: HttpClient) {}

  public getAllRecetas(
    tituloReceta: string = '',
    tipoReceta: number = -1,
    idUsuario: string = '',
    dificultad: string = '',
    comensales: number = null,
    tiempo: number = null,
    ingredientes: Ingrediente[] = [],
    pageNum: number = 0
  ): Observable<any> {
    const parametros: string[] = [];

    if (tituloReceta !== '') {
      parametros.push(`tituloReceta=${tituloReceta}&`);
    }

    if (tipoReceta >= 0) {
      parametros.push(`tipoReceta=${tipoReceta}&`);
    }

    if (idUsuario !== '') {
      parametros.push(`idUsuario=${idUsuario}&`);
    }

    if (dificultad !== '') {
      parametros.push(`dificultad=${dificultad}&`);
    }

    if (comensales) {
      parametros.push(`comensales=${comensales}&`);
    }

    if (tiempo) {
      parametros.push(`tiempo=${tiempo}&`);
    }

    if (ingredientes.length > 0) {
      let ing = '';
      ingredientes.forEach((ingrediente) => {
        ing += `ingrediente=${ingrediente.id}&`;
      });
      parametros.push(ing);
    }

    if (pageNum !== 0) {
      parametros.push(`pageNum=${pageNum}&`);
    }

    let urlConsulta = BACK_URL + 'api/recetas';

    if (parametros.length > 0) {
      urlConsulta += '?';
      parametros.forEach((parametro) => {
        urlConsulta += parametro;
      });
    }
    return this.http.get<any>(urlConsulta);
  }

  public getRecetasMasValoradas(pageSize: number = 0): Observable<any> {
    const parametros: string[] = [];

    if (pageSize !== 0) {
      parametros.push(`pageSize=${pageSize}&`);
    }

    parametros.push(`order=${10}&`);
    parametros.push(`desc=${true}&`);

    let urlConsulta = BACK_URL + 'api/recetas';

    if (parametros.length > 0) {
      urlConsulta += '?';
      parametros.forEach((parametro) => {
        urlConsulta += parametro;
      });
    }
    return this.http.get<any>(urlConsulta);
  }

  public getRecetasRecientes(pageSize: number = 0): Observable<any> {
    const parametros: string[] = [];

    if (pageSize !== 0) {
      parametros.push(`pageSize=${pageSize}&`);
    }

    parametros.push(`order=${5}&`);
    parametros.push(`desc=${true}&`);

    let urlConsulta = BACK_URL + 'api/recetas';

    if (parametros.length > 0) {
      urlConsulta += '?';
      parametros.forEach((parametro) => {
        urlConsulta += parametro;
      });
    }
    return this.http.get<any>(urlConsulta);
  }

  public getReceta(idReceta: number): Observable<Receta> {
    return this.http.get<Receta>(
      BACK_URL + 'api/recetas/receta?idReceta=' + idReceta
    );
  }

  public getUltimasRecetasConsumidas(
    idUsuario: string
  ): Observable<RecetaLista[]> {
    const param = new HttpParams().append('idUsuario', idUsuario);
    return this.http.get<RecetaLista[]>(
      BACK_URL + 'api/recetas/ultimas-consumidas',
      {
        params: param,
      }
    );
  }

  public getRecetasMasConsumidasUsuario(
    idUsuario: string
  ): Observable<RecetaLista[]> {
    const param = new HttpParams().append('idUsuario', idUsuario);
    return this.http.get<RecetaLista[]>(
      BACK_URL + 'api/recetas/mas-consumidas-usuario',
      {
        params: param,
      }
    );
  }

  public getRecetasByUsuario(idUsuario: string): Observable<Receta[]> {
    const param = new HttpParams().append('idUsuario', idUsuario);
    return this.http.get<Receta[]>(BACK_URL + 'api/recetas/usuario', {
      params: param,
    });
  }

  public getUsuariosRecetasFilter(term: string): Observable<UsuarioReceta[]> {
    const param = new HttpParams().append('term', term);
    return this.http.get<UsuarioReceta[]>(BACK_URL + 'api/recetas/usuarios', {
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

  public anadirConsumida(recetaConsumida: RecetaConsumida): Observable<any> {
    return this.http.post<any>(
      BACK_URL + 'api/recetas/receta-consumida',
      recetaConsumida
    );
  }
}
