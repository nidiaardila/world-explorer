import { Routes } from '@angular/router';
import { CountriesList } from './features/countries/pages/countries-list/countries-list';
import { CountryDetail } from './features/countries/pages/country-detail/country-detail';

export const routes: Routes = [
  {
    path: '',
    component: CountriesList
  },
  {
    path: 'country/:code',
    component: CountryDetail
  },
  {
    path: 'favorites',
    redirectTo: ''
  },
  {
    path: '**',
    redirectTo: ''
  }
];