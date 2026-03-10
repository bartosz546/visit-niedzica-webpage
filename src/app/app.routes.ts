import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Map } from './pages/map/map';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'map',
    component: Map,
  },
  { path: '**', redirectTo: '' },
];
