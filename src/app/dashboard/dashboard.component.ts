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

  ngOnInit() {
    this.item = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Project',
        icon: 'pi pi-briefcase',
      },
      {
        label: 'About',
        icon: 'pi pi-user',
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
      {
        label: 'Package',
        icon: 'pi pi-box',
      },
    ];
  }
}
