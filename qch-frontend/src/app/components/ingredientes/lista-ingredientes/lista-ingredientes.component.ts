import { Component, OnInit } from '@angular/core';
import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-lista-ingredientes',
  templateUrl: './lista-ingredientes.component.html',
  styleUrls: ['./lista-ingredientes.component.css'],
})
export class ListaIngredientesComponent implements OnInit {
  ingredientes: Ingrediente[];

  constructor(private ingredienteService: IngredienteService) {}

  ngOnInit(): void {
    this.ingredienteService.getAllIngredientes().subscribe(
      (ingredientes) => {
        this.ingredientes = ingredientes;
        console.log(this.ingredientes);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
