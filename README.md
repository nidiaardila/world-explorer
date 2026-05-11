# World Explorer

World Explorer is an Angular 20 application built with Angular Material that allows users to explore countries using the REST Countries API.

## Features

- Country list
- Search by country name
- Filter by region
- Sort by name or population
- Country detail page
- Country flags and coat of arms
- Favorite countries with localStorage
- Favorites page
- Responsive layout
- Angular Material UI

## Technologies

- Angular 20
- TypeScript
- Angular Material
- SCSS
- RxJS
- Angular Signals
- Angular Router
- REST Countries API
- GitHub Codespaces

## Main Pages

### Countries list

The main page displays countries in cards with:

- Flag
- Country name
- Region
- Capital
- Population
- Country code
- Favorite button
- Clickable card navigation

### Country detail

The detail page shows:

- Flag
- Coat of arms
- Country code
- Region and subregion
- Capital
- Population
- Area
- Languages
- Currencies
- Borders
- Google Maps button

### Favorites

The favorites page shows only the countries marked as favorites.

Favorites are saved in the browser using localStorage.

## API

This project uses the REST Countries API:

```txt
https://restcountries.com/v3.1