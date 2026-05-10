export interface CountryName {
  common: string;
  official: string;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CountryCoatOfArms {
  png?: string;
  svg?: string;
}

export interface CountryCurrency {
  name: string;
  symbol?: string;
}

export interface CountryMaps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Country {
  name: CountryName;
  flags: CountryFlags;
  coatOfArms?: CountryCoatOfArms;
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
  languages?: Record<string, string>;
  currencies?: Record<string, CountryCurrency>;
  cca3: string;
  area: number;
  maps: CountryMaps;
  borders?: string[];
}