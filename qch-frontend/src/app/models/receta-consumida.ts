export class RecetaConsumida {
  idUsuario: string;
  idReceta: number;
  fechaConsumicion: Date;

  constructor(
    idUsuario: string = '',
    idReceta: number = -1,
    fechaConsumicion: Date = new Date()
  ) {
    this.idUsuario = idUsuario;
    this.idReceta = idReceta;
    this.fechaConsumicion = fechaConsumicion;
  }
}
