import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://restcountries.com/v3.1';

  private readonly fields = [
    'name',
    'flags',
    'capital',
    'population',
    'region',
    'subregion',
    'languages',
    'currencies',
    'cca3',
    'area',
    'maps',
    'borders'
  ].join(',');

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/all`, {
      params: {
        fields: this.fields
      }
    });
  }

  getCountryByCode(code: string): Observable<Country | undefined> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/alpha/${code}`, {
        params: {
          fields: this.fields
        }
      })
      .pipe(map((countries) => countries[0]));
  }
}
