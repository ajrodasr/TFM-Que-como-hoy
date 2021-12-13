import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Ingrediente } from 'src/app/models/ingrediente';
import { LikeReceta } from 'src/app/models/like-receta';
import { Paginador } from 'src/app/models/paginador';
import { RecetaLista } from 'src/app/models/receta-lista';
import { TipoReceta } from 'src/app/models/tipo-receta';
import { UsuarioReceta } from 'src/app/models/usuario-receta';
import { AuthService } from 'src/app/services/auth.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.css'],
})
export class ListaRecetasComponent implements OnInit {
  BACK_URL_IMAGES = environment.APIEndpoint + 'images/';

  // Filtro
  tituloReceta: FormControl;
  tipoReceta: FormControl;
  idUsuarioFiltro: FormControl;
  dificultad: FormControl;
  comensales: FormControl;
  tiempo: FormControl;
  filtroForm: FormGroup;

  ingredientesSeleccionados: Ingrediente[] = [];

  // Recetas
  recetas: RecetaLista[];
  likes: number[];
  tiposReceta: TipoReceta[];
  usuariosRecetas: UsuarioReceta[];
  ingredientes: Ingrediente[];

  //Paginador
  paginador: Paginador;

  loading = true;

  mensaje: string;
  idUsuario: string;

  constructor(
    private formBuilder: FormBuilder,
    private recetaService: RecetaService,
    private ingredienteService: IngredienteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.authService.getUsername();
    forkJoin([
      this.recetaService.getAllRecetas(),
      this.recetaService.getLikesUsuario(this.idUsuario),
      this.recetaService.getTiposReceta(),
    ]).subscribe((data) => {
      this.recetas = data[0].list;
      this.paginador = new Paginador(data[0]);
      this.likes = data[1];
      this.tiposReceta = data[2];
    });

    this.tituloReceta = new FormControl('');
    this.tipoReceta = new FormControl(-1);
    this.idUsuarioFiltro = new FormControl('');
    this.dificultad = new FormControl('');
    this.comensales = new FormControl('');
    this.tiempo = new FormControl('');

    this.filtroForm = this.formBuilder.group({
      tituloReceta: this.tituloReceta,
      tipoReceta: this.tipoReceta,
      idUsuarioFiltro: this.idUsuarioFiltro,
      dificultad: this.dificultad,
      comensales: this.comensales,
      tiempo: this.tiempo,
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

  filterIngrediente(term: string): void {
    if (term.length > 2) {
      this.ingredienteService
        .getIngredientesFilterNombre(term)
        .subscribe(
          (ingredientes) =>
            (this.ingredientes = ingredientes.filter(
              (ing) =>
                !this.ingredientesSeleccionados
                  .map((i) => i.id)
                  .includes(ing.id)
            ))
        );
    } else {
      this.ingredientes = null;
    }
  }

  onSelectIngrediente(ingrediente: Ingrediente): void {
    this.ingredientesSeleccionados.push(ingrediente);
    const ingredientesInput = document.getElementById(
      'ingrediente'
    ) as HTMLInputElement;
    ingredientesInput.value = '';
    this.ingredientes = [];
  }

  onRemoveIngrediente(ingrediente: Ingrediente): void {
    this.ingredientesSeleccionados = this.ingredientesSeleccionados.filter(
      (ingredienteRes) => ingredienteRes.id !== ingrediente.id
    );
  }

  filterUsuario(term: string): void {
    if (term.length > 2) {
      this.recetaService
        .getUsuariosRecetasFilter(term)
        .subscribe((usuarios) => (this.usuariosRecetas = usuarios));
    } else {
      this.usuariosRecetas = [];
    }
  }

  onSelectUsuario(idUsuario: string): void {
    this.idUsuarioFiltro.setValue(idUsuario);
    this.usuariosRecetas = null;
  }

  onFilter(pageNum: number = 1): void {
    this.recetaService
      .getAllRecetas(
        this.tituloReceta.value,
        this.tipoReceta.value,
        this.idUsuarioFiltro.value,
        this.dificultad.value,
        this.comensales.value,
        this.tiempo.value,
        this.ingredientesSeleccionados,
        pageNum
      )
      .subscribe((data) => {
        this.recetas = data.list;
        this.paginador = new Paginador(data);
      });
  }

  onResetForm(): void {
    this.tituloReceta.setValue('');
    this.tipoReceta.setValue(-1);
    this.idUsuarioFiltro.setValue('');
    this.dificultad.setValue('');
    this.comensales.setValue('');
    this.tiempo.setValue('');
    this.ingredientesSeleccionados = [];
    const ingredientesInput = document.getElementById(
      'ingrediente'
    ) as HTMLInputElement;
    ingredientesInput.value = '';
    this.ingredientes = [];
    this.usuariosRecetas = [];
    this.onFilter();
  }
}
