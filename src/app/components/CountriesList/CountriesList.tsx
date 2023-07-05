"use client";

import { useEffect, useState } from "react";
import CountryCard from "../CountryCard/CountryCard";
import { Country } from "@/models/interfaces/country.interface";

export default function CountriesList() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

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
      <div className="mb-16 flex justify-between">
        <input
          className="py-4 px-10 rounded-md bg-white drop-shadow"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="py-4 px-10 rounded-md bg-white drop-shadow"
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
      <div className="grid grid-cols-4 gap-16">
        {filteredCountries.map((item) => (
          <div key={item.cca2}>
            <CountryCard country={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
