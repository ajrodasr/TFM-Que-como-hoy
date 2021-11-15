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

  constructor(
    private formBuilder: FormBuilder,
    private ingredienteService: IngredienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ingredienteService.getGrupos().subscribe((grupos) => {
      this.grupos = grupos;
      console.log(grupos);
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
        this.router.navigate(['/ingredientes']);
      },
      (err) => {
        this.mensaje = err.error;
        console.log(err);
      }
    );
  }
}
