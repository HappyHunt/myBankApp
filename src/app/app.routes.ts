import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/dashboard/components/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './shared/guards/auth.gurad';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '**',
    loadComponent: () => PageNotFoundComponent,
  },
];
