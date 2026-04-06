import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CountryDetails } from './country-details/country-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'country/:code', component: CountryDetails }
];

