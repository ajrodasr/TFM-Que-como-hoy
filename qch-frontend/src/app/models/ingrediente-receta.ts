import { GrupoIngrediente } from './grupo-ingrediente';

export class IngredienteReceta {
  id: number;
  nombre: string;
  cantidad: string;
  grupo: GrupoIngrediente;

  constructor(
    id: number = -1,
    nombre: string = '',
    cantidad: string = '',
    grupo: GrupoIngrediente = new GrupoIngrediente()
  ) {
    this.id = id;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.grupo = grupo;
  }
}
