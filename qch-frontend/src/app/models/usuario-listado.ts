export class UsuarioListado {
  id: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  admin: boolean;

  constructor(
    id: string = '',
    nombre: string = '',
    apellido1: string = '',
    apellido2: string = '',
    email: string = '',
    admin: boolean = false
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.email = email;
    this.admin = admin;
  }
}
