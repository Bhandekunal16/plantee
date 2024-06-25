import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public item: any[] | undefined;
  constructor(private router: Router) {}

  private contact(): void {
    this.router.navigate(['/contact']);
  }

  private home(): void {
    this.router.navigate(['/home']);
  }

  private about(): void {
    this.router.navigate(['/about']);
  }

  private list(): void {
    this.router.navigate(['/list']);
  }

  ngOnInit() {
    this.item = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.home();
        },
      },
      {
        label: 'Plants',
        icon: 'pi pi-briefcase',
        command: () => {
          this.list();
        },
      },
      {
        label: 'About',
        icon: 'pi pi-user',
        command: () => {
          this.about();
        },
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        command: () => {
          this.contact();
        },
      },
    ];
  }
}
