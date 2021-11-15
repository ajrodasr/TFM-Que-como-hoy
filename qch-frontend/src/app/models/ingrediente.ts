import { GrupoIngrediente } from './grupo-ingrediente';

export class Ingrediente {
  id: number;
  nombre: string;
  grupo: GrupoIngrediente;

  constructor(
    id: number = -1,
    nombre: string = '',
    grupo: GrupoIngrediente = new GrupoIngrediente()
  ) {
    this.id = id;
    this.nombre = nombre;
    this.grupo = grupo;
  }
}
