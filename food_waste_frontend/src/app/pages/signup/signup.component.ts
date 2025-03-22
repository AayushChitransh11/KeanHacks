import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  role = 'donor';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    // 🔁 Temporary mock signup until backend is connected
    if (this.name && this.email && this.password) {
      const fakeToken = 'mocked-jwt-token';
      this.authService.login(fakeToken, this.role);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Please fill in all fields');
    }
  }
}
