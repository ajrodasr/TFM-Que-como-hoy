import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  nuevoUsuario = new NuevoUsuario();

  idUsuario: FormControl;
  nombre: FormControl;
  apellido1: FormControl;
  apellido2: FormControl;
  email: FormControl;
  password: FormControl;

  registroForm: FormGroup;

  mensaje = '';
  patternNameValidation = '^[a-zA-Z \\-\x27áéíóú]+';
  patternEmailValidation = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idUsuario = new FormControl('', Validators.required);
    this.nombre = new FormControl('', [
      Validators.required,
      Validators.pattern(this.patternNameValidation),
    ]);
    this.apellido1 = new FormControl('', [
      Validators.required,
      Validators.pattern(this.patternNameValidation),
    ]);
    this.apellido2 = new FormControl('', [
      Validators.required,
      Validators.pattern(this.patternNameValidation),
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.patternEmailValidation),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.registroForm = this.formBuilder.group({
      idUsuario: this.idUsuario,
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      email: this.email,
      password: this.password,
    });
  }

  onRegister(): void {
    this.nuevoUsuario.id = this.idUsuario.value;
    this.nuevoUsuario.nombre = this.nombre.value;
    this.nuevoUsuario.apellido1 = this.apellido1.value;
    this.nuevoUsuario.apellido2 = this.apellido2.value;
    this.nuevoUsuario.email = this.email.value;
    this.nuevoUsuario.password = this.password.value;

    this.authService.registro(this.nuevoUsuario).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        this.mensaje = err.error;
      }
    );
  }
}
