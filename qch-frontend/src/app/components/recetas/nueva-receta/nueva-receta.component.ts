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
import { Receta } from 'src/app/models/receta';
import { TipoReceta } from 'src/app/models/tipo-receta';
import { AuthService } from 'src/app/services/auth.service';
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

  titulo: FormControl;
  instrucciones: FormControl;
  tipoReceta: FormControl;
  imagen: FormControl;
  tiempo: FormControl;
  comensales: FormControl;
  dificultad: FormControl;

  recetaForm: FormGroup;

  mensaje = '';
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private recetaService: RecetaService,
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
}
