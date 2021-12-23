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
  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
    this.isAdmin = this.authService.isAdmin();
    if (this.isLogged) {
      this.idUsuario = this.authService.getUsername();
    }
    this.closeOnClick();
  }

  onLogOut(): void {
    this.idUsuario = '';
    this.isLogged = false;
    this.authService.logOut();
    window.location.reload();
  }

  closeOnClick(): void {
    document.addEventListener('DOMContentLoaded', (event) => {
      const links = document.querySelectorAll('nav a');
      const buttonClose = document.querySelector(
        '.navbar-toggler'
      ) as HTMLElement;
      links.forEach((a) => {
        a.addEventListener('click', () => {
          if (buttonClose.getAttribute('aria-expanded') === 'true') {
            buttonClose.click();
          }
        });
      });
    });
  }
}
