import { Component, OnInit } from '@angular/core';
import { LikeReceta } from 'src/app/models/like-receta';
import { Receta } from 'src/app/models/receta';
import { AuthService } from 'src/app/services/auth.service';
import { RecetaService } from 'src/app/services/receta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-recetas',
  templateUrl: './mis-recetas.component.html',
  styleUrls: ['./mis-recetas.component.css'],
})
export class MisRecetasComponent implements OnInit {
  BACK_URL_IMAGES = environment.APIEndpoint + 'images/';

  recetas: Receta[];
  likes: number[];

  mensaje: string;
  idUsuario: string;

  constructor(
    private recetaService: RecetaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.authService.getUsername();

    this.recetaService
      .getRecetasByUsuario(this.idUsuario)
      .subscribe((recetas) => {
        this.recetas = recetas;
      });

    this.recetaService.getLikesUsuario(this.idUsuario).subscribe((likes) => {
      this.likes = likes;
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
          receta.likes.push(this.idUsuario);
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
          receta.likes = receta.likes.filter(
            (usuarioReceta) => usuarioReceta !== this.idUsuario
          );
        }
      });
    });
  }

  onPublicar(idReceta: number): void {
    this.recetaService.publicar(idReceta).subscribe((data) => {
      this.recetas.find((receta) => receta.id === idReceta).publicada = true;
    });
  }

  onDespublicar(idReceta: number): void {
    this.recetaService.despublicar(idReceta).subscribe((data) => {
      this.recetas.find((receta) => receta.id === idReceta).publicada = false;
    });
  }
}
