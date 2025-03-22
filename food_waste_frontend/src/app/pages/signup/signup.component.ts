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
  phone = '';
  role = 'donor';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    if (this.name && this.email && this.password && this.phone) {
      const signupData = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
        phone: this.phone,
        location: {
          address: 'Hardcoded Address', // optionally make dynamic later
          lat: 0,
          lng: 0,
        },
      };

      this.authService.signup(signupData).subscribe({
        next: (res) => {
          this.authService.storeAuthData(res.token, res.user.role);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Signup failed.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }
}
