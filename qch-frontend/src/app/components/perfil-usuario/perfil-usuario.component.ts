import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  id: FormControl;
  nombre: FormControl;
  apellido1: FormControl;
  apellido2: FormControl;
  email: FormControl;

  perfilUsuarioForm: FormGroup;

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
}
