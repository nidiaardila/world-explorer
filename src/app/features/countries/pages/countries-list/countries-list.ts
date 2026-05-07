import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CountriesService } from '../../../../core/services/countries';
import { Country } from '../../../../core/models/country.model';
import { CountryCard } from '../../components/country-card/country-card';
import {
  CountriesFilter,
  SortBy
} from '../../components/countries-filter/countries-filter';
import { Loading } from '../../../../shared/components/loading/loading';
import { ErrorMessage } from '../../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-countries-list',
  imports: [
    MatButtonModule,
    CountryCard,
    CountriesFilter,
    Loading,
    ErrorMessage
  ],
  templateUrl: './countries-list.html',
  styleUrl: './countries-list.scss'
})
export class CountriesList implements OnInit {
  private readonly countriesService = inject(CountriesService);

  readonly countries = signal<Country[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  readonly searchTerm = signal('');
  readonly selectedRegion = signal('all');
  readonly sortBy = signal<SortBy>('name-asc');

  readonly filteredCountries = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const region = this.selectedRegion();
    const sortBy = this.sortBy();

    const filtered = this.countries().filter((country) => {
      const name = country.name.common.toLowerCase();
      const officialName = country.name.official.toLowerCase();

      const matchesName =
        !term || name.includes(term) || officialName.includes(term);

      const matchesRegion = region === 'all' || country.region === region;

      return matchesName && matchesRegion;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name-desc':
          return b.name.common.localeCompare(a.name.common);

        case 'population-desc':
          return b.population - a.population;

        case 'population-asc':
          return a.population - b.population;

        case 'name-asc':
        default:
          return a.name.common.localeCompare(b.name.common);
      }
    });
  });

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.loading.set(true);
    this.error.set('');

    this.countriesService.getAllCountries().subscribe({
      next: (countries) => {
        this.countries.set(countries);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar los países. Intenta de nuevo.');
        this.loading.set(false);
      }
    });
  }
}