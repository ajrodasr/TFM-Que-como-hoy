export class GrupoIngredienteConsumido {
  id: number;
  nombre: string;
  racionesSemana: number;
  racionesConsumidas: number;
  porcentajeConsumido: number;

  constructor(
    id: number = -1,
    nombre: string = '',
    racionesSemana: number = -1,
    racionesConsumidas: number = 0,
    porcentajeConsumido: number = 0
  ) {
    this.id = id;
    this.nombre = nombre;
    this.racionesSemana = racionesSemana;
    this.racionesConsumidas = racionesConsumidas;
    this.porcentajeConsumido = porcentajeConsumido;
  }
}
