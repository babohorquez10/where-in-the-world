"use client";

import { Country } from "@/models/interfaces/country.interface";
import Link from "next/link";

type CountryCardProps = {
  country: Country;
};

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Link href={`/detail/${country.cca2}`}>
      <div className="bg-white rounded-lg overflow-hidden cursor-pointer drop-shadow-md h-full flex flex-col">
        <img
          className="w-full"
          src={country.flags.png}
          alt={country.flags.alt}
        />
        <div className="px-4 py-6 flex-1 flex flex-col">
          <h4 className="font-bold text-xl mb-4">{country.name.common}</h4>
          <h5>
            <strong>Population:</strong> {country.population}
          </h5>
          <h5>
            <strong>Region:</strong> {country.region}
          </h5>
          <h5>
            <strong>Capital:</strong> {country.capital}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
