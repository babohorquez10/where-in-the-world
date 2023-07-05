"use client";

import { useEffect, useState } from "react";
import CountryCard from "../CountryCard/CountryCard";
import { Country } from "@/models/interfaces/country.interface";

export default function CountriesList() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);

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

  return (
    <section>
      <div className="grid grid-cols-4 gap-16">
        {countries.map((country) => (
          <div key={country.cca2}>
            <CountryCard country={country} />
          </div>
        ))}
      </div>
    </section>
  );
}
