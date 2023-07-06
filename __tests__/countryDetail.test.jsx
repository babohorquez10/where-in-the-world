import { render, screen } from "@testing-library/react";
import axios from "axios";
import { data } from "../__mocks__/mockData";
import Detail from "@/app/detail/[code]/page";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

const testCountry = data[2];
const mockDetailResponse = {
  data: [testCountry],
};

axios.get.mockImplementation(() => Promise.resolve(mockDetailResponse));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Country detail", () => {
  it("renders country info", async () => {
    render(<Detail params={{ code: "ES" }} />);

    const name = await screen.findByText("Spain");
    expect(name).toBeInTheDocument();

    const nativeName = screen.getByText("España");
    expect(nativeName).toBeInTheDocument();

    const population = screen.getByText("10,000");
    expect(population).toBeInTheDocument();

    const region = screen.getByText("Europe");
    expect(region).toBeInTheDocument();

    const subRegion = screen.getByText("Southern Europe");
    expect(subRegion).toBeInTheDocument();

    const Capital = screen.getByText("Madrid");
    expect(Capital).toBeInTheDocument();

    const currencies = screen.getByText("Euro");
    expect(currencies).toBeInTheDocument();

    const languages = screen.getByText("Spanish");
    expect(languages).toBeInTheDocument();

    const flag = screen.getByAltText("The flag of Spain.");
    expect(flag).toBeInTheDocument();
  });

  it("renders country borders", async () => {
    render(<Detail params={{ code: "ES" }} />);

    const borders = await screen.findAllByTestId("border-country-button");
    expect(borders).toHaveLength(testCountry.borders.length);

    // Renders each border.
    for (const border of testCountry.borders) {
      const borderButton = screen.getByText(border);
      expect(borderButton).toBeInTheDocument();
    }
  });
});
