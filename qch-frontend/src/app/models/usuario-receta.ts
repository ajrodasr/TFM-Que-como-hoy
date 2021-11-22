export class UsuarioReceta {
  id: string;
  nombre: string;
  apellido1: string;
  apellido2: string;

  constructor(
    id: string = '',
    nombre: string = '',
    apellido1: string = '',
    apellido2: string = ''
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
  }
}
