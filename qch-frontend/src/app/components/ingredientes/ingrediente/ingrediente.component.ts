import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoIngrediente } from 'src/app/models/grupo-ingrediente';
import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css'],
})
export class IngredienteComponent implements OnInit {
  ingrediente = new Ingrediente();
  grupos: GrupoIngrediente[];

  nombre: FormControl;
  idGrupo: FormControl;

  ingredienteForm: FormGroup;

  mensaje = '';

  constructor(
    private formBuilder: FormBuilder,
    private ingredienteService: IngredienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idIngrediente = this.activatedRoute.snapshot.params.idIngrediente;
    this.ingredienteService.getIngredientesById(idIngrediente).subscribe(
      (data) => {
        this.ingrediente = data;
        this.nombre = new FormControl(data.nombre, [Validators.required]);
        this.idGrupo = new FormControl(data.grupo.id, [Validators.required]);

        this.ingredienteForm = this.formBuilder.group({
          nombre: this.nombre,
          idGrupo: this.idGrupo,
        });
      },
      (err) => {
        this.mensaje = err.mensaje;
      }
    );

    this.ingredienteService.getGrupos().subscribe((grupos) => {
      this.grupos = grupos;
    });
  }

  onUpdateIngrediente(): void {
    this.ingrediente.nombre = this.nombre.value;
    this.ingrediente.grupo.id = this.idGrupo.value;

    this.ingredienteService.actualizarIngrediente(this.ingrediente).subscribe(
      (data) => {
        this.router.navigate(['/ingredientes']);
      },
      (err) => {
        this.mensaje = err.error;
      }
    );
  }
}
