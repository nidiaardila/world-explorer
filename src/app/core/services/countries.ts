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

  private readonly listFields =
    'name,flags,capital,population,region,subregion,cca3';

  getAllCountries(): Observable<Country[]> {
    const url = `${this.apiUrl}/all?fields=${this.listFields}`;
    return this.http.get<Country[]>(url);
  }

  getCountryByCode(code: string): Observable<Country | undefined> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(map((countries) => countries[0]));
  }
}