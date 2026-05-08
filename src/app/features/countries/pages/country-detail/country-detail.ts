import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { Country } from '../../../../core/models/country.model';
import { CountriesService } from '../../../../core/services/countries';
import { Loading } from '../../../../shared/components/loading/loading';
import { ErrorMessage } from '../../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-country-detail',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    Loading,
    ErrorMessage
  ],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.scss'
})
export class CountryDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly countriesService = inject(CountriesService);

  readonly country = signal<Country | undefined>(undefined);
  readonly loading = signal(false);
  readonly error = signal('');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('code');

      if (!code) {
        this.error.set('No se encontró el código del país.');
        return;
      }

      this.loadCountry(code);
    });
  }

  loadCountry(code: string): void {
    this.loading.set(true);
    this.error.set('');

    this.countriesService.getCountryByCode(code).subscribe({
      next: (country) => {
        if (!country) {
          this.error.set('No encontramos información de este país.');
        }

        this.country.set(country);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar el detalle del país.');
        this.loading.set(false);
      }
    });
  }

  get capital(): string {
    return this.country()?.capital?.join(', ') || 'No disponible';
  }

  get population(): string {
    const population = this.country()?.population || 0;
    return new Intl.NumberFormat('es-ES').format(population);
  }

  get area(): string {
    const area = this.country()?.area || 0;
    return `${new Intl.NumberFormat('es-ES').format(area)} km²`;
  }

  get languages(): string[] {
    return Object.values(this.country()?.languages || {});
  }

  get currencies(): string[] {
    return Object.values(this.country()?.currencies || {}).map((currency) => {
      return currency.symbol
        ? `${currency.name} (${currency.symbol})`
        : currency.name;
    });
  }

  get borders(): string[] {
    return this.country()?.borders || [];
  }
}