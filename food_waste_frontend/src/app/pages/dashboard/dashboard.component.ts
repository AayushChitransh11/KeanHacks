import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const role = this.authService.getUserRole(); // from localStorage
    if (role === 'donor') {
      this.router.navigate(['/donor-dashboard']);
    } else if (role === 'receiver') {
      this.router.navigate(['/receiver-dashboard']);
    } else {
      this.router.navigate(['/login']); // fallback if no role
    }
  }
}
