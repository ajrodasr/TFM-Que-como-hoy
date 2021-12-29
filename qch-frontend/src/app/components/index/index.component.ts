import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { LikeReceta } from 'src/app/models/like-receta';
import { RecetaLista } from 'src/app/models/receta-lista';
import { AuthService } from 'src/app/services/auth.service';
import { RecetaService } from 'src/app/services/receta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  BACK_URL_IMAGES = 'https://res.cloudinary.com/tfm-qch/image/upload/';

  recetas: RecetaLista[];
  recetasValoradas: RecetaLista[];
  recetasRecientes: RecetaLista[];
  idUsuario: string;
  likes: number[];

  numRecetasGrid = 3;

  constructor(
    private authService: AuthService,
    private recetaService: RecetaService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.authService.getUsername();
    forkJoin([
      this.recetaService.getRecetasMasValoradas(this.numRecetasGrid),
      this.recetaService.getRecetasRecientes(this.numRecetasGrid),
      this.recetaService.getLikesUsuario(this.idUsuario),
    ]).subscribe((data) => {
      this.recetasValoradas = data[0].list;
      this.recetasRecientes = data[1].list;
      this.likes = data[2];
    });
  }

  onFilter(term: string): void {
    if (term.length > 0) {
      this.recetaService.getAllRecetas(term).subscribe((data) => {
        this.recetas = data.list;
      });
    } else {
      this.recetas = [];
    }
  }

  like(id: number): boolean {
    return this.likes.includes(id);
  }

  onLike(idReceta: number): void {
    const like = new LikeReceta(idReceta, this.idUsuario);
    this.recetaService.like(like).subscribe((data) => {
      this.likes.push(idReceta);
      this.recetasValoradas.forEach((receta) => {
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
      this.recetasValoradas.forEach((receta) => {
        if (receta.id === idReceta) {
          receta.likes--;
        }
      });
    });
  }
}
