import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { LikeReceta } from 'src/app/models/like-receta';
import { Paginador } from 'src/app/models/paginador';
import { RecetaHistorico } from 'src/app/models/receta-historico';
import { AuthService } from 'src/app/services/auth.service';
import { RecetaService } from 'src/app/services/receta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historico-recetas',
  templateUrl: './historico-recetas.component.html',
  styleUrls: ['./historico-recetas.component.css'],
})
export class HistoricoRecetasComponent implements OnInit {
  BACK_URL_IMAGES = environment.APIEndpoint + 'images/';

  idUsuario: string;

  // Recetas
  recetas: RecetaHistorico[];
  likes: number[];
  //Paginador
  paginador: Paginador;

  constructor(
    private recetaService: RecetaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.authService.getUsername();
    forkJoin([
      this.recetaService.getHistoricoRecetas(this.idUsuario),
      this.recetaService.getLikesUsuario(this.idUsuario),
    ]).subscribe((data) => {
      this.recetas = data[0].list;
      this.paginador = new Paginador(data[0]);
      this.likes = data[1];
    });
  }

  like(id: number): boolean {
    return this.likes.includes(id);
  }

  onLike(idReceta: number): void {
    const like = new LikeReceta(idReceta, this.idUsuario);
    this.recetaService.like(like).subscribe((data) => {
      this.likes.push(idReceta);
      this.recetas.forEach((receta) => {
        if (receta.id === idReceta) {
          receta.likes++;
        }
      });
    });
  }

  onDislike(idReceta: number): void {
    const like = new LikeReceta(idReceta, this.idUsuario);
    this.recetaService.dislike(like).subscribe((data) => {
      this.likes = this.likes.filter((id) => id !== idReceta);
      this.recetas.forEach((receta) => {
        if (receta.id === idReceta) {
          receta.likes--;
        }
      });
    });
  }

  onNavigate(pageNum: number = 1): void {
    this.recetaService
      .getHistoricoRecetas(this.idUsuario, pageNum)
      .subscribe((data) => {
        this.recetas = data.list;
        this.paginador = new Paginador(data);
      });
  }

  getFechaConsumicion(idReceta: number, fechaConsumicionReceta: Date): string {
    const receta = this.recetas.find((recetaEncontrada) => {
      if (
        recetaEncontrada.id === idReceta &&
        recetaEncontrada.fechaConsumicion === fechaConsumicionReceta
      ) {
        return recetaEncontrada;
      }
    });
    const fechaConsumicion = receta.fechaConsumicion;
    return `Receta consumida el ${fechaConsumicion[2]}/${fechaConsumicion[1]}/${
      fechaConsumicion[0]
    } a las ${fechaConsumicion[3].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${fechaConsumicion[4].toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  }
}
