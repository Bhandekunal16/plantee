import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public item: any[] | undefined;
  public isOnline: boolean | any;
  constructor(private router: Router, private networkService: NetworkService) {}

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
    this.networkService.onlineStatus$.subscribe((status) => {
      this.isOnline = status;
    });

    this.item = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.home();
        },
        styleClass: 'menucus',
      },
      {
        label: 'Plants',
        icon: 'pi pi-briefcase',
        command: () => {
          this.list();
        },
        styleClass: 'menucus',
      },
      {
        label: 'About',
        icon: 'pi pi-user',
        command: () => {
          this.about();
        },
        styleClass: 'menucus',
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        command: () => {
          this.contact();
        },
        styleClass: 'menucus',
      },
      {
        label: this.update(this.isOnline),
        icon: this.updateSymbol(this.isOnline),
        styleClass: 'menucus',
      },
    ];
  }

  update(input: boolean) {
    return input ? 'Online' : 'Offline';
  }

  updateSymbol(input: boolean) {
    return input ? 'pi pi-wifi' : 'pi pi-globe';
  }
}
