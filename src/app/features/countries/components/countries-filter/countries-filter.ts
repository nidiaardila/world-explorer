import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export type SortBy =
  | 'name-asc'
  | 'name-desc'
  | 'population-desc'
  | 'population-asc';

@Component({
  selector: 'app-countries-filter',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './countries-filter.html',
  styleUrl: './countries-filter.scss'
})
export class CountriesFilter {
  @Input() searchTerm = '';
  @Input() selectedRegion = 'all';
  @Input() sortBy: SortBy = 'name-asc';

  @Output() searchTermChange = new EventEmitter<string>();
  @Output() selectedRegionChange = new EventEmitter<string>();
  @Output() sortByChange = new EventEmitter<SortBy>();

  readonly regions = [
    { value: 'all', label: 'Todas las regiones' },
    { value: 'Africa', label: 'África' },
    { value: 'Americas', label: 'América' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europa' },
    { value: 'Oceania', label: 'Oceanía' },
    { value: 'Antarctic', label: 'Antártida' }
  ];

  readonly sortOptions: { value: SortBy; label: string }[] = [
    { value: 'name-asc', label: 'Nombre A-Z' },
    { value: 'name-desc', label: 'Nombre Z-A' },
    { value: 'population-desc', label: 'Mayor población' },
    { value: 'population-asc', label: 'Menor población' }
  ];
}