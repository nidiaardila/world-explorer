import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Country } from '../../../../core/models/country.model';

@Component({
  selector: 'app-country-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './country-card.html',
  styleUrl: './country-card.scss'
})
export class CountryCard {
  private readonly router = inject(Router);

  @Input({ required: true }) country!: Country;
  @Input() favorite = false;

  @Output() toggleFavorite = new EventEmitter<string>();

  get capital(): string {
    return this.country.capital?.join(', ') || 'No disponible';
  }

  get population(): string {
    return new Intl.NumberFormat('es-ES').format(this.country.population);
  }

  openDetail(): void {
    this.router.navigate(['/country', this.country.cca3]);
  }

  onToggleFavorite(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.toggleFavorite.emit(this.country.cca3);
  }
}