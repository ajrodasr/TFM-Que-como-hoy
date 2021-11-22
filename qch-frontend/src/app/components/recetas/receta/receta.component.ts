import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css'],
})
export class RecetaComponent implements OnInit {
  receta: Receta;

  constructor(
    private recetaService: RecetaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idReceta = this.activatedRoute.snapshot.params.idReceta;
    this.recetaService.getReceta(idReceta).subscribe(
      (receta) => {
        this.receta = receta;
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
      return 'Un día a la semana perfectamente.';
    }
    return racionesSemana + ' días a la semana como máximo';
  }
}
