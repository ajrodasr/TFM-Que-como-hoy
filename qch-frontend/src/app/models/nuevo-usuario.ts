export class NuevoUsuario {
  id: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  password: string;

  constructor(
    id: string = '',
    nombre: string = '',
    apellido1: string = '',
    apellido2: string = '',
    email: string = '',
    password: string = ''
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.email = email;
    this.password = password;
  }
}
