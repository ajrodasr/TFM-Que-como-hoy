import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmailPassword } from 'src/app/models/email-password';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email-password',
  templateUrl: './email-password.component.html',
  styleUrls: ['./email-password.component.css'],
})
export class EmailPasswordComponent implements OnInit {
  emailPassword = new EmailPassword();

  email: FormControl;
  emailPasswordForm: FormGroup;
  mensaje = '';
  error = false;

  patternEmailValidation = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.patternEmailValidation),
    ]);

    this.emailPasswordForm = this.formBuilder.group({
      email: this.email,
    });
  }

  onEnviarEmailPassword(): void {
    this.emailPassword.email = this.email.value;

    this.authService.enviarEmailPassword(this.emailPassword).subscribe(
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
