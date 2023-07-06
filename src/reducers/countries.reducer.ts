import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCountries,
  setRegionFilter,
  setSearchInput,
} from "./countries.actions";
import { Country } from "@/models/interfaces/country.interface";

interface CountriesState {
  data: Country[];
  countries: Country[];
  searchInput: "";
  regionFilter: "";
  loading: boolean;
  error: string;
}

const initialState: CountriesState = {
  data: [],
  countries: [],
  loading: true,
  searchInput: "",
  regionFilter: "",
  error: "",
};

const filterCountries = (
  countries: Country[],
  search: string,
  regionFilter: string
) => {
  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(search.trim().toLowerCase()) &&
      country.region
        .toLowerCase()
        .includes(regionFilter.trim().toLocaleLowerCase())
  );

  return filteredCountries;
};

export const countriesReducer = createReducer(initialState, (builder: any) => {
  builder.addCase(fetchCountries.pending, (state: CountriesState) => ({
    ...state,
    data: [],
    countries: [],
    loading: true,
  }));

  builder.addCase(
    fetchCountries.rejected,
    (state: CountriesState, action: any) => ({
      ...state,
      data: [],
      countries: [],
      error: action.error?.message,
      loading: false,
    })
  );

  builder.addCase(
    fetchCountries.fulfilled,
    (state: CountriesState, action: any) => ({
      ...state,
      data: action.payload.data,
      countries: action.payload.data,
      loading: false,
    })
  );

  builder.addCase(setSearchInput, (state: CountriesState, action: any) => ({
    ...state,
    searchInput: action.payload,
    countries: filterCountries(state.data, action.payload, state.regionFilter),
  }));

  builder.addCase(setRegionFilter, (state: CountriesState, action: any) => ({
    ...state,
    regionFilter: action.payload,
    countries: filterCountries(state.data, state.searchInput, action.payload),
  }));
});
