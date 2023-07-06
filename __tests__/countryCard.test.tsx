import { render, screen } from "@testing-library/react";
import { data } from "../__mocks__/mockData";
import CountryCard from "@/app/components/CountryCard/CountryCard";
import { Country } from "@/models/interfaces/country.interface";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

const testCountry = data[0];

jest.mock("axios");

describe("Country card", () => {
  it("renders country info", async () => {
    render(<CountryCard country={testCountry as Country} />);

    const countryPopulationLabel = await screen.findByText("Population:");
    expect(countryPopulationLabel).toBeInTheDocument();

    const countryPopulation = screen.getByText(
      testCountry.population.toLocaleString("en-US")
    );
    expect(countryPopulation).toBeInTheDocument();

    const countryRegionLabel = screen.getByText("Region:");
    expect(countryRegionLabel).toBeInTheDocument();

    const countryRegion = screen.getByText(testCountry.region);
    expect(countryRegion).toBeInTheDocument();

    const countryCapitalLabel = screen.getByText("Capital:");
    expect(countryCapitalLabel).toBeInTheDocument();

    const countryCapital = screen.getByText(testCountry.capital);
    expect(countryCapital).toBeInTheDocument();

    const countryFlag = screen.getByAltText(testCountry.flags.alt);
    expect(countryFlag).toBeInTheDocument();
  });
});
