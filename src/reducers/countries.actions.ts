import { Country } from "@/models/interfaces/country.interface";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CountriesService } from "./countries.service";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  CountriesService.getAll
);

export const setCountries = createAction<Country[]>("countries/setCountries");
export const setSearchInput = createAction<string>("countries/setSearchInput");
export const setRegionFilter = createAction<string>(
  "countries/setRegionFilter"
);
