import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  public contact(): void {
    this.router.navigate(['/contact']);
  }

  public about(): void {
    this.router.navigate(['/about']);
  }

  public list(): void {
    this.router.navigate(['/list']);
  }
}
