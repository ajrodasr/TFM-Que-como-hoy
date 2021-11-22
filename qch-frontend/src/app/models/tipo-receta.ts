export class TipoReceta {
  id: number;
  nombre: string;

  constructor(id: number = -1, nombre: string = '') {
    this.id = id;
    this.nombre = nombre;
  }
}
