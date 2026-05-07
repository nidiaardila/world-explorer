import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Country } from '../../../../core/models/country.model';

@Component({
  selector: 'app-country-card',
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './country-card.html',
  styleUrl: './country-card.scss'
})
export class CountryCard {
  @Input({ required: true }) country!: Country;

  get capital(): string {
    return this.country.capital?.join(', ') || 'No disponible';
  }

  get population(): string {
    return new Intl.NumberFormat('es-ES').format(this.country.population);
  }
}
