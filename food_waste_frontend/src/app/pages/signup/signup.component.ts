import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  role = '';
  zipcode = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSignup(): void {
    if (!this.role || this.role === '') {
      this.snackBar.open('Please select your role', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snack-bar-error'],
      });
      return;
    }

    if (
      this.name &&
      this.email &&
      this.password &&
      this.phone &&
      this.zipcode
    ) {
      const signupData = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
        phone: this.phone,
        zipcode: this.zipcode,
        location: {
          address: 'Hardcoded Address', // can make dynamic later
          lat: 0,
          lng: 0,
        },
      };

      this.authService.signup(signupData).subscribe({
        next: (res) => {
          this.snackBar.open('Account created! Please log in.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-bar-success'],
          });

          this.router.navigate(['/login']);
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
