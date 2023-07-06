"use client";

import { useEffect, useState } from "react";
import CountryCard from "../CountryCard/CountryCard";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useSelector } from "react-redux";
import { fetchCountries } from "@/reducers/countries.actions";
import { useAppDispatch } from "@/utils/hooks";
import {
  selectCountries,
  selectError,
  selectLoading,
} from "@/reducers/countries.selectors";
import SearchInput from "../SearchInput/SearchInput";
import RegionFilter from "../RegionFilter/RegionFilter";

export default function CountriesList() {
  const dispatch = useAppDispatch();

  const [regionFilter, setRegionFilter] = useState("");

  const countries = useSelector(selectCountries);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <section>
      <div className="mb-16 md:flex justify-between">
        <SearchInput />
        <RegionFilter />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-16">
        {countries.map((item) => (
          <div key={item.cca2}>
            <CountryCard country={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
