type CountryName = {
  common: string;
  official: string;
  nativeName?: Object;
};

type CountryFlags = {
  png: string;
  svg: string;
  alt: string;
};

export interface Country {
  cca2: string;
  cca3: string;
  name: CountryName;
  population: number;
  region: string;
  subregion: string;
  currencies?: Object;
  capital: string;
  flags: CountryFlags;
  languages?: Object;
  borders?: string[];
}
