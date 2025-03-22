import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  phone = '';
  role = '';
  errorMessage = '';

  // address fields
  street = '';
  apt = '';
  city = '';
  state = '';
  zip = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSignup(): void {
    if (!this.role) {
      this.snackBar.open('Please select your role', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    if (
      this.name &&
      this.email &&
      this.password &&
      this.phone &&
      this.street &&
      this.city &&
      this.state &&
      this.zip
    ) {
      const signupData = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
        phone: this.phone,
        address: {
          street: this.street,
          apt: this.apt,
          city: this.city,
          state: this.state,
          zip: this.zip,
        },
      };

      this.authService.signup(signupData).subscribe({
        next: (res) => {
          this.snackBar.open('Signup successful!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage =
            err.error?.message || 'Signup failed. Please try again.';
          this.snackBar.open(this.errorMessage, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
}
