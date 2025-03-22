import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  role = 'donor';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    // Simulated login - replace with real API call later
    if (this.email && this.password) {
      const fakeToken = 'mocked-jwt-token';
      this.authService.login(fakeToken, this.role);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Please fill in all fields');
    }
  }
}

