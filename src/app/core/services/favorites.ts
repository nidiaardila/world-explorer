import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly storageKey = 'world-explorer-favorites';

  readonly favoriteCodes = signal<string[]>(this.loadFavorites());

  isFavorite(code: string): boolean {
    return this.favoriteCodes().includes(code);
  }

  toggleFavorite(code: string): void {
    const currentFavorites = this.favoriteCodes();

    const updatedFavorites = currentFavorites.includes(code)
      ? currentFavorites.filter((favoriteCode) => favoriteCode !== code)
      : [...currentFavorites, code];

    this.favoriteCodes.set(updatedFavorites);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedFavorites));
  }

  private loadFavorites(): string[] {
    const savedFavorites = localStorage.getItem(this.storageKey);

    if (!savedFavorites) {
      return [];
    }

    try {
      return JSON.parse(savedFavorites);
    } catch {
      return [];
    }
  }
}
