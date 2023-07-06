import { Country } from "@/models/interfaces/country.interface";
import axios from "axios";

const getAll = async (): Promise<Country[]> =>
  await axios.get(
    "https://restcountries.com/v3.1/all?fields=cca2,name,flags,population,region,capital"
  );

export const CountriesService = {
  getAll,
};
