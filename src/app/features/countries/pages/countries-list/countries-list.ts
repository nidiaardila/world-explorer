import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CountriesService } from '../../../../core/services/countries';
import { FavoritesService } from '../../../../core/services/favorites';
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
    RouterLink,
  MatButtonModule,
  MatIconModule,
  CountryCard,
  CountriesFilter,
  Loading,
  ErrorMessage
  ],
  templateUrl: './countries-list.html',
  styleUrl: './countries-list.scss'
})
export class CountriesList implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly countriesService = inject(CountriesService);
  private readonly favoritesService = inject(FavoritesService);

  readonly countries = signal<Country[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  readonly searchTerm = signal('');
  readonly selectedRegion = signal('all');
  readonly sortBy = signal<SortBy>('name-asc');
  readonly showOnlyFavorites = signal(false);

  readonly pageTitle = computed(() =>
    this.showOnlyFavorites() ? 'Tus países favoritos' : 'Explora países del mundo'
  );

  readonly pageDescription = computed(() =>
    this.showOnlyFavorites()
      ? 'Aquí verás los países que marcaste como favoritos.'
      : 'Busca, filtra y ordena países por región, nombre y población.'
  );

  readonly totalFavoriteCountries = computed(() => {
  const favoriteCodes = this.favoritesService.favoriteCodes();

  return this.countries().filter((country) =>
    favoriteCodes.includes(country.cca3)
  ).length;
});

  readonly filteredCountries = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const region = this.selectedRegion();
    const sortBy = this.sortBy();
    const favoriteCodes = this.favoritesService.favoriteCodes();
    const onlyFavorites = this.showOnlyFavorites();

    const filtered = this.countries().filter((country) => {
      const name = country.name.common.toLowerCase();
      const officialName = country.name.official.toLowerCase();

      const matchesName =
        !term || name.includes(term) || officialName.includes(term);

      const matchesRegion = region === 'all' || country.region === region;

      const matchesFavorites =
        !onlyFavorites || favoriteCodes.includes(country.cca3);

      return matchesName && matchesRegion && matchesFavorites;
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
    this.route.data.subscribe((data) => {
      this.showOnlyFavorites.set(Boolean(data['onlyFavorites']));
    });

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
      error: (error) => {
        console.error('Error cargando países:', error);
        this.error.set('No pudimos cargar los países. Intenta de nuevo.');
        this.loading.set(false);
      }
    });
  }

  isFavorite(code: string): boolean {
    return this.favoritesService.isFavorite(code);
  }

  toggleFavorite(code: string): void {
    this.favoritesService.toggleFavorite(code);
  }

  clearFilters(): void {
  this.searchTerm.set('');
  this.selectedRegion.set('all');
  this.sortBy.set('name-asc');
}
}