"use client";

import { useEffect, useRef, useState } from "react";
import CountryCard from "../CountryCard/CountryCard";
import { Country } from "@/models/interfaces/country.interface";
import { BsSearch } from "react-icons/bs";

export default function CountriesList() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=cca2,name,flags,population,region,capital"
    )
      .then((resp) => resp.json())
      .then((data) => setCountries(data));
  });

  useEffect(() => {
    if (countries) setLoading(false);
  }, [countries]);

  const handleSearchIconClick = () => {
    searchInputRef?.current?.focus();
  };

  if (loading) return <section>Loading...</section>;

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(search.trim().toLowerCase()) &&
      country.region
        .toLowerCase()
        .includes(regionFilter.trim().toLocaleLowerCase())
  );

  return (
    <section>
      <div className="mb-16 md:flex justify-between">
        <div className="relative">
          <span
            className="absolute z-50 mt-4 ml-4 md:ml-10 cursor-text"
            onClick={handleSearchIconClick}
          >
            <BsSearch className="search-icon" fontSize={"1.4rem"} />
          </span>
          <input
            ref={searchInputRef}
            className="py-4 px-14 md:px-24 pr-4 rounded-md drop-shadow block md:inline w-full md:w-search mb-6 md:mb-0"
            placeholder="Search for a country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="py-4 px-4 md:px-10 rounded-md drop-shadow md:w-auto w-1/2"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-16">
        {filteredCountries.map((item) => (
          <div key={item.cca2}>
            <CountryCard country={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
