import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GrupoIngrediente } from 'src/app/models/grupo-ingrediente';
import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-nuevo-ingrediente',
  templateUrl: './nuevo-ingrediente.component.html',
  styleUrls: ['./nuevo-ingrediente.component.css'],
})
export class NuevoIngredienteComponent implements OnInit {
  nuevoIngrediente = new Ingrediente();
  grupos: GrupoIngrediente[];

  nombre: FormControl;
  idGrupo: FormControl;

  nuevoIngredienteForm: FormGroup;

  mensaje = '';
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private ingredienteService: IngredienteService
  ) {}

  ngOnInit(): void {
    this.ingredienteService.getGrupos().subscribe((grupos) => {
      this.grupos = grupos;
    });

    this.nombre = new FormControl('', [Validators.required]);
    this.idGrupo = new FormControl(null, [Validators.required]);

    this.nuevoIngredienteForm = this.formBuilder.group({
      nombre: this.nombre,
      idGrupo: this.idGrupo,
    });
  }

  onSaveIngrediente(): void {
    this.nuevoIngrediente.nombre = this.nombre.value;
    this.nuevoIngrediente.grupo.id = this.idGrupo.value;

    this.ingredienteService.nuevoIngrediente(this.nuevoIngrediente).subscribe(
      (data) => {
        this.error = false;
        this.mensaje = data.mensaje;
        this.nombre.reset();
        this.idGrupo.reset();
      },
      (err) => {
        this.error = true;
        this.mensaje = err.error;
        console.log(err);
      }
    );
  }
}
