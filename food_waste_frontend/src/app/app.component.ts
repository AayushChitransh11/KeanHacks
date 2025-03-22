import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    localStorage.clear(); // remove token and role
    this.router.navigate(['/login']); // redirect to login page
  }
}
