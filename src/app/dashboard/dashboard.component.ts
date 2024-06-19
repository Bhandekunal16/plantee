import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenubarModule, ButtonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public item: any[] | undefined;

  constructor(private router: Router) {}

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
      },
      {
        label: 'About',
        icon: 'pi pi-user',
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

  contact(): void {
    this.router.navigate(['/contact']);
  }

  home(): void {
    this.router.navigate(['/home']);
  }
}
