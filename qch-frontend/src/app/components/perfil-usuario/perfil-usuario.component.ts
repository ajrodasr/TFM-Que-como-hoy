import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CambiarPasswordPerfil } from 'src/app/models/cambiar-password-perfil';
import { JwtDto } from 'src/app/models/jwt-dto';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  perfilUsuario = new PerfilUsuario();
  error = false;
  mensaje = '';
  cambiarPasswordPerfil = new CambiarPasswordPerfil();
  errorPass = false;
  mensajePass = '';

  id: FormControl;
  nombre: FormControl;
  apellido1: FormControl;
  apellido2: FormControl;
  email: FormControl;

  perfilUsuarioForm: FormGroup;

  password: FormControl;
  confirmPassword: FormControl;

  cambiarPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const idUsuario = this.authService.getUsername();
    this.usuarioService.getPerfilUsuario(idUsuario).subscribe(
      (data) => {
        this.id = new FormControl(data.id, Validators.required);
        this.nombre = new FormControl(data.nombre, Validators.required);
        this.apellido1 = new FormControl(data.apellido1, Validators.required);
        this.apellido2 = new FormControl(data.apellido2, Validators.required);
        this.email = new FormControl(data.email, Validators.required);

        this.perfilUsuarioForm = this.formBuilder.group({
          id: this.id,
          nombre: this.nombre,
          apellido1: this.apellido1,
          apellido2: this.apellido2,
          email: this.email,
        });
      },
      (err) => {
        this.error = true;
        this.mensaje = err.error;
        console.log(err);
      }
    );

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.cambiarPasswordForm = this.formBuilder.group({
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  onActualizaDatos(): void {
    this.perfilUsuario.id = this.id.value;
    this.perfilUsuario.nombre = this.nombre.value;
    this.perfilUsuario.apellido1 = this.apellido1.value;
    this.perfilUsuario.apellido2 = this.apellido2.value;
    this.perfilUsuario.email = this.email.value;

    this.usuarioService.actualizarPerfilUsuario(this.perfilUsuario).subscribe(
      (data) => {
        this.mensaje = data.mensaje;
      },
      (err) => {
        this.error = true;
        this.mensaje = err.error;
      }
    );
  }

  onCambiarPassword(): void {
    this.cambiarPasswordPerfil.idUsuario = this.authService.getUsername();
    this.cambiarPasswordPerfil.password = this.password.value;
    this.cambiarPasswordPerfil.confirmPassword = this.confirmPassword.value;

    this.usuarioService
      .cambiarPasswordPerfil(this.cambiarPasswordPerfil)
      .subscribe(
        (data) => {
          this.mensajePass = data.mensaje;
          const token = this.authService.getToken();
          this.authService.refresh(new JwtDto(token));
        },
        (err) => {
          this.mensajePass = err.error;
          this.errorPass = true;
          console.log(err);
        }
      );
  }
}
