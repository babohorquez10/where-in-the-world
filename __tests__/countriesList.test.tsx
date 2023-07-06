import { render, screen, fireEvent } from "@testing-library/react";
import CountriesList from "../src/app/page";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { data } from "../utils/mockData";

jest.mock("axios");

const searchInputSetup = () => {
  const utils = render(<CountriesList />);
  const input = screen.getByRole("textbox");

  return {
    input,
    ...utils,
  };
};

const regionFilterSetup = () => {
  const utils = render(<CountriesList />);
  const select = screen.getByRole("combobox");

  return {
    select,
    ...utils,
  };
};

describe("Initial countries list", () => {
  it("renders filters", () => {
    render(<CountriesList />);

    const searchFilter = screen.getByRole("textbox");
    expect(searchFilter).toBeInTheDocument();

    const regionFilter = screen.getByRole("combobox");
    expect(regionFilter).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(6);
  });

  it("renders countries", async () => {
    render(<CountriesList />);

    // Renders 3 cards.
    const cards = await screen.findAllByTestId("country-card");
    expect(cards).toHaveLength(data.length);

    // Renders each country.
    for (const country of data) {
      const countryCard = screen.getByText(country.name.common);
      expect(countryCard).toBeInTheDocument();
    }
  });
});

describe("Filtered countries by search input", () => {
  it("filters countries if word typed is included in country name", async () => {
    const { input } = searchInputSetup();

    // Type Col.
    fireEvent.change(input, { target: { value: "Col" } });

    // Renders only 1 card.
    const cards1 = await screen.findAllByTestId("country-card");
    expect(cards1).toHaveLength(1);

    // Renders Colombia card.
    const country1 = screen.queryByText("Colombia");
    expect(country1).toBeInTheDocument();

    // Does not render other cards.
    const country2 = screen.queryByText("Argentina");
    expect(country2).not.toBeInTheDocument();

    const country3 = screen.queryByText("Spain");
    expect(country3).not.toBeInTheDocument();
  });

  it("filters countries by word ignoring spaces and case", async () => {
    const { input } = searchInputSetup();

    // Type Argentina with additional spaces and uppercase.
    fireEvent.change(input, { target: { value: "  ARGENTINA " } });

    // Renders only 1 card.
    const cards2 = await screen.findAllByTestId("country-card");
    expect(cards2).toHaveLength(1);

    // Renders Argentina card.
    const country2Case2 = screen.queryByText("Argentina");
    expect(country2Case2).toBeInTheDocument();

    // Does not render other cards.
    const country1Case2 = screen.queryByText("Colombia");
    expect(country1Case2).not.toBeInTheDocument();

    const country3Case2 = screen.queryByText("Spain");
    expect(country3Case2).not.toBeInTheDocument();
  });

  it("does not render any cards", async () => {
    const { input } = searchInputSetup();

    // Type not-existing country.
    fireEvent.change(input, { target: { value: "Does not exist" } });

    // Does not render any cards.
    const cards2 = screen.queryAllByTestId("country-card");
    expect(cards2).toHaveLength(0);

    const country2Case2 = screen.queryByText("Argentina");
    expect(country2Case2).not.toBeInTheDocument();

    const country1Case2 = screen.queryByText("Colombia");
    expect(country1Case2).not.toBeInTheDocument();

    const country3Case2 = screen.queryByText("Spain");
    expect(country3Case2).not.toBeInTheDocument();
  });
});

describe("Filtered countries by region filter", () => {
  it("filters countries by region", async () => {
    const { select } = regionFilterSetup();

    // Region: Americas.
    fireEvent.change(select, { target: { value: "Americas" } });

    // Renders 2 cards.
    const cards1 = await screen.findAllByTestId("country-card");
    expect(cards1).toHaveLength(2);

    // Renders Colombia and Argentina card.
    const country1 = screen.queryByText("Colombia");
    expect(country1).toBeInTheDocument();

    const country2 = screen.queryByText("Argentina");
    expect(country2).toBeInTheDocument();

    const country3 = screen.queryByText("Spain");
    expect(country3).not.toBeInTheDocument();

    // Region: Europe.
    fireEvent.change(select, { target: { value: "Europe" } });

    // Renders 2 cards.
    const cards1Case2 = await screen.findAllByTestId("country-card");
    expect(cards1Case2).toHaveLength(1);

    // Renders only Spain card.
    const country1Case2 = screen.queryByText("Colombia");
    expect(country1Case2).not.toBeInTheDocument();

    const country2Case2 = screen.queryByText("Argentina");
    expect(country2Case2).not.toBeInTheDocument();

    const country3Case2 = screen.queryByText("Spain");
    expect(country3Case2).toBeInTheDocument();
  });

  it("does not render any cards", async () => {
    const { select } = regionFilterSetup();

    // Region: Americas.
    fireEvent.change(select, { target: { value: "Asia" } });

    // Does not render any cards.
    const cards2 = screen.queryAllByTestId("country-card");
    expect(cards2).toHaveLength(0);

    const country2Case2 = screen.queryByText("Argentina");
    expect(country2Case2).not.toBeInTheDocument();

    const country1Case2 = screen.queryByText("Colombia");
    expect(country1Case2).not.toBeInTheDocument();

    const country3Case2 = screen.queryByText("Spain");
    expect(country3Case2).not.toBeInTheDocument();
  });
});
