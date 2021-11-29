import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoIngrediente } from 'src/app/models/grupo-ingrediente';
import { LikeReceta } from 'src/app/models/like-receta';
import { Receta } from 'src/app/models/receta';
import { AuthService } from 'src/app/services/auth.service';
import { RecetaService } from 'src/app/services/receta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css'],
})
export class RecetaComponent implements OnInit {
  BACK_URL_IMAGES = environment.APIEndpoint + 'images/';
  receta: Receta;
  idUsuario: string;

  constructor(
    private recetaService: RecetaService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.authService.getUsername();
    const idReceta = this.activatedRoute.snapshot.params.idReceta;
    this.recetaService.getReceta(idReceta).subscribe(
      (receta) => {
        if (receta.publicada || receta.usuario.id === this.idUsuario) {
          this.receta = receta;
        } else {
          this.router.navigate(['/recetas']);
        }
      },
      (err) => {
        this.router.navigate(['/recetas']);
      }
    );
  }

  getRecomendacion(): string {
    let racionesSemana = 7;
    this.receta.ingredientes.forEach((ingrediente) => {
      racionesSemana =
        ingrediente.grupo.racionesSemana < racionesSemana
          ? ingrediente.grupo.racionesSemana
          : racionesSemana;
    });
    if (racionesSemana === 7) {
      return 'Un día a la semana perfectamente';
    }
    return racionesSemana + ' días a la semana como máximo';
  }

  getContiene(): GrupoIngrediente[] {
    const gruposId = new Set<number>();
    this.receta.ingredientes.forEach((ingrediente) => {
      gruposId.add(ingrediente.grupo.id);
    });

    const grupos: GrupoIngrediente[] = [];

    this.receta.ingredientes.forEach((ingrediente) => {
      if (gruposId.has(ingrediente.grupo.id)) {
        grupos.push(ingrediente.grupo);
        gruposId.delete(ingrediente.grupo.id);
      }
    });

    return grupos;
  }

  like(): boolean {
    return this.receta.likes.includes(this.idUsuario);
  }

  onLike(): void {
    const like = new LikeReceta(this.receta.id, this.idUsuario);
    this.recetaService.like(like).subscribe((data) => {
      this.receta.likes.push(this.idUsuario);
    });
  }

  onDislike(): void {
    const like = new LikeReceta(this.receta.id, this.idUsuario);
    this.recetaService.dislike(like).subscribe((data) => {
      this.receta.likes = this.receta.likes.filter(
        (element) => element !== this.idUsuario
      );
    });
  }

  handleMissingImage(event): void {
    event.target.src = this.BACK_URL_IMAGES + 'default.jpg';
  }
}
