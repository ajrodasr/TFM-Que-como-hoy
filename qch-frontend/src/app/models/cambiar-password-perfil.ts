export class CambiarPasswordPerfil {
  idUsuario: string;
  password: string;
  confirmPassword: string;

  constructor(
    idUsuario: string = '',
    password: string = '',
    confirmPassword: string = ''
  ) {
    this.idUsuario = idUsuario;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
