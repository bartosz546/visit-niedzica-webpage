import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { MapPage } from './pages/map-page/map-page';
import { ArticlePage } from './pages/article-page/article-page';
import { CzorsztynPage } from './pages/czorsztyn-page/czorsztyn-page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'map',
    component: MapPage,
  },
  {
    path: 'article',
    component: ArticlePage,
  },
  {
    path: 'czorsztyn',
    component: CzorsztynPage,
  },
  { path: '**', redirectTo: '' },
];
