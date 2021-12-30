import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Ingrediente } from 'src/app/models/ingrediente';
import { LikeReceta } from 'src/app/models/like-receta';
import { Paginador } from 'src/app/models/paginador';
import { Receta } from 'src/app/models/receta';
import { RecetaLista } from 'src/app/models/receta-lista';
import { TipoReceta } from 'src/app/models/tipo-receta';
import { UsuarioReceta } from 'src/app/models/usuario-receta';
import { AuthService } from 'src/app/services/auth.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-recetas',
  templateUrl: './mis-recetas.component.html',
  styleUrls: ['./mis-recetas.component.css'],
})
export class MisRecetasComponent implements OnInit {
  BACK_URL_IMAGES = 'https://res.cloudinary.com/tfm-qch/image/upload/';

  // Filtro
  tituloReceta: FormControl;
  tipoReceta: FormControl;
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
      this.recetaService.getRecetasByUsuario(this.idUsuario),
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
    this.dificultad = new FormControl('');
    this.comensales = new FormControl('');
    this.tiempo = new FormControl('');

    this.filtroForm = this.formBuilder.group({
      tituloReceta: this.tituloReceta,
      tipoReceta: this.tipoReceta,
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
    this.usuariosRecetas = null;
  }

  onFilter(pageNum: number = 1): void {
    this.recetaService
      .getRecetasByUsuario(
        this.idUsuario,
        this.tituloReceta.value,
        this.tipoReceta.value,
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
