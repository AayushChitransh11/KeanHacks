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
  role = 'donor'; // Will get this from API response later
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (res) => {
          // Example response: { token: '...', user: { role: 'donor', ... } }
          this.authService.storeAuthData(res.token, res.user.role);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Login failed. Check your credentials.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }
}