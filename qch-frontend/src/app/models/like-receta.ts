export class LikeReceta {
  idReceta: number;
  idUsuario: string;

  constructor(idReceta: number = -1, idUsuario: string = '') {
    this.idReceta = idReceta;
    this.idUsuario = idUsuario;
  }
}
