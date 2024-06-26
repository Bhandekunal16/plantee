import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
  {
    component: DashboardComponent,
    path: '',
    children: [
      { component: ContactComponent, path: 'contact' },
      { component: HomeComponent, path: '' },
      { component: HomeComponent, path: 'home' },
      { component: AboutComponent, path: 'about' },
      { component: ListComponent, path: 'list' },
      { component: ViewComponent, path: 'view' },
    ],
  },
];
