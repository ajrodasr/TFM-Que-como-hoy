import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-nueva-receta',
  templateUrl: './nueva-receta.component.html',
  styleUrls: ['./nueva-receta.component.css'],
})
export class NuevaRecetaComponent implements OnInit {
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

  idUsuario: string;
  nuevaReceta = new Receta();
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.authService.getUsername();
    this.recetaService
      .getTiposReceta()
      .subscribe((tipos) => (this.tiposReceta = tipos));
    this.titulo = new FormControl('', Validators.required);
    this.instrucciones = new FormControl('', Validators.required);
    this.tipoReceta = new FormControl(null, Validators.required);
    this.imagen = new FormControl('', Validators.required);
    this.tiempo = new FormControl('', Validators.required);
    this.comensales = new FormControl('', Validators.required);
    this.dificultad = new FormControl(null, Validators.required);

    this.recetaForm = this.formBuilder.group({
      titulo: this.titulo,
      instrucciones: this.instrucciones,
      tipoReceta: this.tipoReceta,
      imagen: this.imagen,
      tiempo: this.tiempo,
      comensales: this.comensales,
      dificultad: this.dificultad,
    });

    this.id = new FormControl('', Validators.required);
    this.nombre = new FormControl('', Validators.required);
    this.cantidad = new FormControl('', Validators.required);

    this.ingredienteForm = this.formBuilder.group({
      id: this.id,
      nombre: this.nombre,
      cantidad: this.cantidad,
    });

    this.ingredienteService.getGrupos().subscribe((grupos) => {
      this.grupos = grupos;
    });

    this.nombreIngrediente = new FormControl('', [Validators.required]);
    this.idGrupo = new FormControl(null, [Validators.required]);

    this.nuevoIngredienteForm = this.formBuilder.group({
      nombreIngrediente: this.nombreIngrediente,
      idGrupo: this.idGrupo,
    });
  }

  onNuevaReceta(): void {
    // Nombre a la imagen
    const nombreImagen =
      'receta_' + new Date().getTime() + '_' + this.imageFile.name;

    this.nuevaReceta.titulo = this.titulo.value;
    this.nuevaReceta.instrucciones = this.instrucciones.value;
    this.nuevaReceta.tipoReceta.id = this.tipoReceta.value;
    this.nuevaReceta.imagen = nombreImagen;
    this.nuevaReceta.tiempo = this.tiempo.value;
    this.nuevaReceta.comensales = this.comensales.value;
    this.nuevaReceta.dificultad = this.dificultad.value;
    this.nuevaReceta.usuario.id = this.idUsuario;
    this.nuevaReceta.ingredientes = this.ingredientesSeleccionados;

    const uploadImageData = new FormData();
    uploadImageData.append(
      'imageFile',
      this.imageFile,
      this.nuevaReceta.imagen
    );

    this.recetaService
      .uploadImage(uploadImageData)
      .pipe(
        mergeMap((data1) => this.recetaService.nuevaReceta(this.nuevaReceta)),
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
    let repetido = false;
    if (this.ingredientesSeleccionados.length > 0) {
      this.ingredientesSeleccionados.forEach((ingrediente) => {
        if (ingrediente.id === this.id.value) {
          this.mensajeAnadirIngrediente =
            'El ingrediente ya se encuentra en la receta';
          this.errorAnadirIngrediente = true;
          repetido = true;
        }
      });
    }
    if (!repetido) {
      this.ingredientesSeleccionados.push(
        new IngredienteReceta(
          this.id.value,
          this.nombre.value,
          this.cantidad.value
        )
      );
      this.id.setValue(null);
      this.nombre.setValue(null);
      this.cantidad.setValue(null);
      this.mensajeAnadirIngrediente = '';
      this.errorAnadirIngrediente = false;
    }
  }

  eliminarIngrediente(idIngrediente: number): void {
    this.ingredientesSeleccionados = this.ingredientesSeleccionados.filter(
      (ingrediente) => ingrediente.id !== idIngrediente
    );
  }

  onCreateIngrediente(): void {
    this.nuevoIngrediente.nombre = this.nombre.value;
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
