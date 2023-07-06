import { RootState } from "@/utils/store";

export const selectCountries = (state: RootState) => state.countries.countries;
export const selectLoading = (state: RootState) => state.countries.loading;
export const selectError = (state: RootState) => state.countries.error;
export const selectSearchInput = (state: RootState) =>
  state.countries.searchInput;
export const selectRegionFilter = (state: RootState) =>
  state.countries.regionFilter;
