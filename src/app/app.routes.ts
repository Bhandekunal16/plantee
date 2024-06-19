import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  {
    component: DashboardComponent,
    path: '',
    children: [{ component: ContactComponent, path: 'contact' }],
  },
];
