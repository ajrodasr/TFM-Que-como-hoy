import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isLogged = false;
  idUsuario = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
    if (this.isLogged) {
      this.idUsuario = this.authService.getUsername();
    }
  }

  onLogOut(): void {
    this.idUsuario = '';
    this.isLogged = false;
    this.authService.logOut();
    window.location.reload();
  }
}
