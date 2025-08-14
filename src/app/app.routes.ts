import { Routes } from '@angular/router';
import { MapsComponent } from './components/maps/maps.component';
import { GaleriaComponent } from './components/galeria/galeria.component';

export const routes: Routes = [
  { path: '', redirectTo: '/maps', pathMatch: 'full' },
  { path: 'maps', component: MapsComponent },
  { path: 'galeria', component: GaleriaComponent },
];
