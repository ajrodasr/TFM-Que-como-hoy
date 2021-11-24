import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-nueva-receta',
  templateUrl: './nueva-receta.component.html',
  styleUrls: ['./nueva-receta.component.css'],
})
export class NuevaRecetaComponent implements OnInit {
  nuevoReceta = new Receta();

  titulo: FormControl;
  instrucciones: FormControl;
  tipoReceta: FormControl;
  imagen: FormControl;
  tiempo: FormControl;
  comensales: FormControl;
  dificultad: FormControl;

  recetaForm: FormGroup;

  mensaje = '';

  constructor(
    private formBuilder: FormBuilder,
    private recetaService: RecetaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titulo = new FormControl('', Validators.required);
    this.instrucciones = new FormControl('', Validators.required);
    this.tipoReceta = new FormControl('', Validators.required);
    this.imagen = new FormControl('', Validators.required);
    this.tiempo = new FormControl('', [Validators.required]);
    this.comensales = new FormControl('', [Validators.required]);
    this.dificultad = new FormControl('', [Validators.required]);

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
    console.log('hecho');
  }
}
