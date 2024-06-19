import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  contact(): void {
    this.router.navigate(['/contact']);
  }

  about(): void {
    this.router.navigate(['/about']);
  }

  list(): void {
    this.router.navigate(['/list']);
  }
}
