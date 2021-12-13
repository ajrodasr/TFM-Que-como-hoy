import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

    this.nombreIngrediente = new FormControl('');
    this.grupo = new FormControl(-1);

    this.filtroForm = this.formBuilder.group({
      nombreIngrediente: this.nombreIngrediente,
      grupo: this.grupo,
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
}
