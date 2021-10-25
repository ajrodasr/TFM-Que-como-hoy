import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUsuario = new LoginUsuario();

  idUsuario: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  mensaje: '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.idUsuario = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

    this.loginForm = this.formBuilder.group({
      idUsuario: this.idUsuario,
      password: this.password,
    });
  }

  public onLogin(): void {
    this.loginUsuario.id = this.idUsuario.value;
    this.loginUsuario.password = this.password.value;

    this.authService.login(this.loginUsuario).subscribe(
      (data) => {
        this.authService.setToken(data.token);
        window.location.href = '/';
      },
      (err) => {
        let msg = err.error.message;
        if (!msg) {
          msg =
            'Ha ocurrido un error de conexión, vuelva a intentarlo mas tarde';
        }
        this.mensaje = msg;
        console.log(err);
      }
    );
  }
}
