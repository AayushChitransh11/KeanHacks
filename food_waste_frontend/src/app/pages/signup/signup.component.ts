import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: false,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  role: string = '';
  errorMessage: string = '';

  address = {
    street: '',
    apt: '',
    city: '',
    state: '',
    zip: '',
  };

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
      this.address.street &&
      this.address.city &&
      this.address.state &&
      this.address.zip
    ) {
      const signupData = {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
        role: this.role,
        address: {
          street: this.address.street,
          apt: this.address.apt,
          city: this.address.city,
          state: this.address.state,
          zip: this.address.zip,
        },
      };

      console.log('Signup Payload:', signupData); // debug log

      this.authService.signup(signupData).subscribe({
        next: (res: any) => {
          this.snackBar.open('Signup successful! Please login.', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error(err);
          this.snackBar.open('Signup failed. Please try again.', 'Close', {
            duration: 3000,
          });
        },
      });
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
      });
    }
  }
}
