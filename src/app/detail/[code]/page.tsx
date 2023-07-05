"use client";

import Button from "@/app/components/Button/Button";
import { Country } from "@/models/interfaces/country.interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type DetailProps = {
  params?: any;
};

const Detail: React.FC<DetailProps> = ({ params }) => {
  const router = useRouter();

  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${params?.code}`)
      .then((resp) => resp.json())
      .then((data) => setCountry(data[0]));
  }, [params?.code]);

  if (!country) return <div>Loading...</div>;

  return (
    <main>
      <div className="my-20">
        <Link href={"/"}>
          <Button onClick={() => router.back()}>Back</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-40">
        <div className="align-left">
          <img
            className="max-h-96"
            src={country.flags.svg}
            alt={country.flags.alt}
          />
        </div>
        <div className="h-fit self-center">
          <h2 className="text-3xl mb-10">{country.name.common}</h2>

          <div className="flex justify-between">
            <div>
              <div>
                <strong>Native Name:</strong>{" "}
                {Object.values(country.name.nativeName)[0]?.common}
              </div>
              <div>
                <strong>Population:</strong> {country.population}
              </div>
              <div>
                <strong>Region:</strong> {country.region}
              </div>
              <div>
                <strong>Sub Region:</strong> {country.subregion}
              </div>
              <div>
                <strong>Capital:</strong> {country.capital}
              </div>
            </div>
            <div>
              <div>
                <strong>Currencies:</strong>{" "}
                {Object.values(country.currencies)
                  .map((currency) => currency.name)
                  .join(", ")}
              </div>
              <div>
                <strong>Languages:</strong>{" "}
                {Object.values(country.languages).join(", ")}
              </div>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="mt-10">
              <strong className="mr-4">Border Countries: </strong>
              <span className="inline-block">
                <span className="flex gap-4 flex-wrap">
                  {country.borders?.map((countryCode) => (
                    <Link key={countryCode} href={`/detail/${countryCode}`}>
                      <Button>{countryCode}</Button>
                    </Link>
                  ))}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Detail;
