import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CambiarPassword } from 'src/app/models/cambiar-password';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css'],
})
export class CambiarPasswordComponent implements OnInit {
  cambiarPassword = new CambiarPassword();

  password: FormControl;
  confirmPassword: FormControl;

  cambiarPasswordForm: FormGroup;
  mensaje = '';
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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

  onCambiarPassword(): void {
    this.cambiarPassword.password = this.password.value;
    this.cambiarPassword.confirmPassword = this.confirmPassword.value;
    this.cambiarPassword.tokenPassword =
      this.activatedRoute.snapshot.params.tokenPassword;

    this.authService.cambiarPassword(this.cambiarPassword).subscribe(
      (data) => {
        this.mensaje = data.mensaje;
        this.error = false;
      },
      (err) => {
        this.mensaje = err.error;
        this.error = true;
      }
    );
  }
}
