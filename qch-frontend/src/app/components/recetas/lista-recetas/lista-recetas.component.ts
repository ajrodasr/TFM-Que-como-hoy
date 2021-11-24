import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { LikeReceta } from 'src/app/models/like-receta';
import { Receta } from 'src/app/models/receta';
import { AuthService } from 'src/app/services/auth.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.css'],
})
export class ListaRecetasComponent implements OnInit {
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

    this.recetaService.getAllRecetas().subscribe((recetas) => {
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
}
