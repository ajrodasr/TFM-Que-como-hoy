import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GrupoIngredienteConsumido } from 'src/app/models/grupo-ingrediente-consumido';
import { Ingrediente } from 'src/app/models/ingrediente';
import { LikeReceta } from 'src/app/models/like-receta';
import { RecetaLista } from 'src/app/models/receta-lista';
import { AuthService } from 'src/app/services/auth.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mi-alimentacion',
  templateUrl: './mi-alimentacion.component.html',
  styleUrls: ['./mi-alimentacion.component.css'],
})
export class MiAlimentacionComponent implements OnInit {
  BACK_URL_IMAGES = environment.APIEndpoint + 'images/';

  idUsuario: string;
  ultimasRecetasConsumidas: RecetaLista[];
  recetasMasConsumidas: RecetaLista[];
  ingredientesMasUsados: Ingrediente[];
  gruposConsumidos: GrupoIngredienteConsumido[];

  constructor(
    private authService: AuthService,
    private recetaService: RecetaService,
    private ingredienteService: IngredienteService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.authService.getUsername();
    forkJoin([
      this.recetaService.getUltimasRecetasConsumidas(this.idUsuario),
      this.recetaService.getRecetasMasConsumidasUsuario(this.idUsuario),
      this.ingredienteService.getIngredientesMasUsadosUsuario(this.idUsuario),
      this.ingredienteService.getGruposConsumidos(this.idUsuario),
    ]).subscribe((data) => {
      this.ultimasRecetasConsumidas = data[0];
      this.recetasMasConsumidas = data[1];
      this.ingredientesMasUsados = data[2];
      this.gruposConsumidos = data[3];
      console.log(this.gruposConsumidos);
    });
  }
}
