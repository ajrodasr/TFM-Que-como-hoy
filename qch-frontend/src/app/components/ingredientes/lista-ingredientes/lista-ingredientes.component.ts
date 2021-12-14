import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GrupoIngrediente } from 'src/app/models/grupo-ingrediente';
import { Ingrediente } from 'src/app/models/ingrediente';
import { Paginador } from 'src/app/models/paginador';
import { AuthService } from 'src/app/services/auth.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-lista-ingredientes',
  templateUrl: './lista-ingredientes.component.html',
  styleUrls: ['./lista-ingredientes.component.css'],
})
export class ListaIngredientesComponent implements OnInit {
  ingredientes: Ingrediente[];
  grupos: GrupoIngrediente[];
  paginador: Paginador;

  // Filtro
  nombreIngrediente: FormControl;
  grupo: FormControl;
  filtroForm: FormGroup;

  // Nuevo ingrediente
  nuevoIngrediente = new Ingrediente();

  nombreIng: FormControl;
  idGrupoIng: FormControl;

  nuevoIngredienteForm: FormGroup;

  mensajeIngrediente = '';
  errorIngrediente = false;

  constructor(
    private formBuilder: FormBuilder,
    private ingredienteService: IngredienteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.ingredienteService.getAllIngredientes(),
      this.ingredienteService.getGrupos(),
    ]).subscribe((data) => {
      this.ingredientes = data[0].list;
      this.paginador = new Paginador(data[0]);
      this.grupos = data[1];
    });

    // Filtro
    this.nombreIngrediente = new FormControl('');
    this.grupo = new FormControl(-1);

    this.filtroForm = this.formBuilder.group({
      nombreIngrediente: this.nombreIngrediente,
      grupo: this.grupo,
    });

    // Nuevo ingrediente
    this.nombreIng = new FormControl('', [Validators.required]);
    this.idGrupoIng = new FormControl(null, [Validators.required]);

    this.nuevoIngredienteForm = this.formBuilder.group({
      nombreIng: this.nombreIng,
      idGrupoIng: this.idGrupoIng,
    });
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onFilter(pageNum: number = 0): void {
    this.ingredienteService
      .getAllIngredientes(
        this.grupo.value,
        this.nombreIngrediente.value,
        pageNum
      )
      .subscribe((data) => {
        this.ingredientes = data.list;
        this.paginador = new Paginador(data);
      });
  }

  onReset(): void {
    this.nombreIngrediente.setValue('');
    this.grupo.setValue(-1);
    this.onFilter();
  }

  onCreateIngrediente(): void {
    this.nuevoIngrediente.nombre = this.nombreIng.value;
    this.nuevoIngrediente.grupo.id = this.idGrupoIng.value;

    this.ingredienteService.nuevoIngrediente(this.nuevoIngrediente).subscribe(
      (data) => {
        this.errorIngrediente = false;
        this.mensajeIngrediente = data.mensaje;
        this.nombreIng.reset();
        this.idGrupoIng.reset();
      },
      (err) => {
        this.errorIngrediente = true;
        this.mensajeIngrediente = err.error;
      }
    );
  }
}
