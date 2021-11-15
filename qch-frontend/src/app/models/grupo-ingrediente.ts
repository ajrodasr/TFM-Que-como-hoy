export class GrupoIngrediente {
  id: number;
  nombre: string;
  racionesSemana: number;

  constructor(
    id: number = -1,
    nombre: string = '',
    racionesSemana: number = -1
  ) {
    this.id = id;
    this.nombre = nombre;
    this.racionesSemana = racionesSemana;
  }
}
