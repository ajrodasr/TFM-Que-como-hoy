import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { catchError, mergeMap } from 'rxjs/operators';
import { GrupoIngrediente } from 'src/app/models/grupo-ingrediente';
import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteReceta } from 'src/app/models/ingrediente-receta';
import { Receta } from 'src/app/models/receta';
import { TipoReceta } from 'src/app/models/tipo-receta';
import { AuthService } from 'src/app/services/auth.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.component.html',
  styleUrls: ['./editar-receta.component.css'],
})
export class EditarRecetaComponent implements OnInit {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Escriba aqui las instrucciones...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'indent',
        'outdent',
        'heading',
        'fontName',
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  BACK_URL_IMAGES = environment.APIEndpoint + 'images/';

  idUsuario: string;
  receta = new Receta();
  tiposReceta: TipoReceta[];
  imageFile: File;
  miniatura: string;
  ingredientes: Ingrediente[];
  ingredientesSeleccionados: IngredienteReceta[] = [];

  // Receta
  titulo: FormControl;
  instrucciones: FormControl;
  tipoReceta: FormControl;
  imagen: FormControl;
  tiempo: FormControl;
  comensales: FormControl;
  dificultad: FormControl;

  recetaForm: FormGroup;

  // Ingrediente
  id: FormControl;
  nombre: FormControl;
  cantidad: FormControl;

  ingredienteForm: FormGroup;

  nuevoIngrediente = new Ingrediente();
  grupos: GrupoIngrediente[];

  nombreIngrediente: FormControl;
  idGrupo: FormControl;

  nuevoIngredienteForm: FormGroup;

  mensaje = '';
  error = false;

  mensajeIngrediente = '';
  errorIngrediente = false;

  mensajeAnadirIngrediente = '';
  errorAnadirIngrediente = false;

  constructor(
    private formBuilder: FormBuilder,
    private recetaService: RecetaService,
    private ingredienteService: IngredienteService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idReceta = this.activatedRoute.snapshot.params.idReceta;
    this.idUsuario = this.authService.getUsername();
    this.recetaService
      .getTiposReceta()
      .subscribe((tipos) => (this.tiposReceta = tipos));

    this.ingredienteService.getGrupos().subscribe((grupos) => {
      this.grupos = grupos;
    });

    this.recetaService.getReceta(idReceta).subscribe((receta) => {
      if (this.idUsuario !== receta.usuario.id) {
        this.router.navigate(['recetas']);
      }
      this.receta = receta;
      this.titulo = new FormControl(receta.titulo, Validators.required);
      this.instrucciones = new FormControl(
        receta.instrucciones,
        Validators.required
      );
      this.tipoReceta = new FormControl(
        receta.tipoReceta.id,
        Validators.required
      );
      this.imagen = new FormControl(receta.imagen, Validators.required);
      this.tiempo = new FormControl(receta.tiempo, Validators.required);
      this.comensales = new FormControl(receta.comensales, Validators.required);
      this.dificultad = new FormControl(receta.dificultad, Validators.required);
      this.imagen = new FormControl();
      this.ingredientesSeleccionados = receta.ingredientes;
      this.miniatura = this.BACK_URL_IMAGES + receta.imagen;
      this.recetaForm = this.formBuilder.group({
        titulo: this.titulo,
        instrucciones: this.instrucciones,
        tipoReceta: this.tipoReceta,
        imagen: this.imagen,
        tiempo: this.tiempo,
        comensales: this.comensales,
        dificultad: this.dificultad,
      });
    });

    this.id = new FormControl('', Validators.required);
    this.nombre = new FormControl('', Validators.required);
    this.cantidad = new FormControl('', Validators.required);

    this.ingredienteForm = this.formBuilder.group({
      id: this.id,
      nombre: this.nombre,
      cantidad: this.cantidad,
    });

    this.nombreIngrediente = new FormControl('', [Validators.required]);
    this.idGrupo = new FormControl(null, [Validators.required]);

    this.nuevoIngredienteForm = this.formBuilder.group({
      nombreIngrediente: this.nombreIngrediente,
      idGrupo: this.idGrupo,
    });
  }

  onEditarReceta(): void {
    this.receta.titulo = this.titulo.value;
    this.receta.instrucciones = this.instrucciones.value;
    this.receta.tipoReceta.id = this.tipoReceta.value;
    this.receta.tiempo = this.tiempo.value;
    this.receta.comensales = this.comensales.value;
    this.receta.dificultad = this.dificultad.value;
    this.receta.usuario.id = this.idUsuario;
    this.receta.ingredientes = this.ingredientesSeleccionados;

    if (this.imageFile) {
      // Nombre a la imagen
      const nombreImagen =
        'receta_' + new Date().getTime() + '_' + this.imageFile.name;
      this.receta.imagen = nombreImagen;
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.imageFile, this.receta.imagen);
      this.recetaService
        .uploadImage(uploadImageData)
        .pipe(
          mergeMap((data1) => this.recetaService.deleteImage(this.receta.id)),
          mergeMap((data2) => this.recetaService.editarReceta(this.receta)),
          catchError((err) => {
            console.log(err);
            this.mensaje = err.error;
            this.error = true;
            return err;
          })
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['mis-recetas']);
          },
          (err) => {
            console.log(err);
            this.mensaje = err.error;
            this.error = true;
          }
        );
    } else {
      this.recetaService.editarReceta(this.receta).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['mis-recetas']);
        },
        (err) => {
          console.log(err);
          this.mensaje = err.error;
          this.error = true;
        }
      );
    }
  }

  onChange(event: any): void {
    this.imageFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.miniatura = e.target.result.toString();
    };
    fileReader.readAsDataURL(this.imageFile);
  }

  filter(term: string): void {
    if (term.length > 2) {
      this.ingredienteService
        .getIngredientesFilterNombre(term)
        .subscribe((ingredientes) => (this.ingredientes = ingredientes));
    } else {
      this.ingredientes = null;
    }
    this.id.setValue(null);
  }

  onSelectIngrediente(ingrediente: Ingrediente): void {
    this.id.setValue(ingrediente.id);
    this.nombre.setValue(ingrediente.nombre);
    this.ingredientes = null;
  }

  onNuevoIngrediente(): void {
    const ingredienteSeleccionado = new IngredienteReceta(
      this.id.value,
      this.nombre.value,
      this.cantidad.value
    );
    this.recetaService
      .anadeIngrediente(this.receta.id, ingredienteSeleccionado)
      .subscribe(
        (data) => {
          this.ingredientesSeleccionados.push(ingredienteSeleccionado);
          this.id.setValue(null);
          this.nombre.setValue(null);
          this.cantidad.setValue(null);
          this.errorAnadirIngrediente = false;
        },
        (err) => {
          this.mensajeAnadirIngrediente = err.error;
          this.errorAnadirIngrediente = true;
        }
      );
  }

  eliminarIngrediente(idIngrediente: number): void {
    if (confirm('¿Seguro que desea eliminar el ingrediente de la receta?')) {
      this.recetaService
        .quitaIngrediente(this.receta.id, idIngrediente)
        .subscribe(
          (data) => {
            this.ingredientesSeleccionados =
              this.ingredientesSeleccionados.filter(
                (ingrediente) => ingrediente.id !== idIngrediente
              );
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  onCreateIngrediente(): void {
    this.nuevoIngrediente.nombre = this.nombreIngrediente.value;
    this.nuevoIngrediente.grupo.id = this.idGrupo.value;

    this.ingredienteService.nuevoIngrediente(this.nuevoIngrediente).subscribe(
      (data) => {
        this.errorIngrediente = false;
        this.mensajeIngrediente = data.mensaje;
        this.nombreIngrediente.reset();
        this.idGrupo.reset();
      },
      (err) => {
        this.errorIngrediente = true;
        this.mensajeIngrediente = err.error;
      }
    );
  }
}
