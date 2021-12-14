import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isLogged: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
  }
}
