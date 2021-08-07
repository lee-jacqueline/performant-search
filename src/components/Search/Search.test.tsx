/**
 * Search Component
 *
 * Test cases to cover for
 * 1. When there are no search results, no countries should display.
 * 2. Where there are search results, they are properly displayed when input is focused.
 * 3. When typing into the input field, the results are properly displayed.
 * 4. When choosing a country, the value of the input is updated to the selected country.
 */

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Search from ".";
import { CountryType } from "../../App";

afterEach(cleanup);

describe("Search Tests", () => {
  const countries = [
    {
      name: "Afghanistan",
      flag: "https://restcountries.eu/data/afg.svg",
    },
    {
      name: "Denmark",
      flag: "https://restcountries.eu/data/dnk.svg",
    },
    {
      name: "Egypt",
      flag: "https://restcountries.eu/data/egy.svg",
    },
    {
      name: "Greenland",
      flag: "https://restcountries.eu/data/grl.svg",
    },
    {
      name: "Singapore",
      flag: "https://restcountries.eu/data/sgp.svg",
    },
  ];
  let selectedCountry = {
    name: "",
    flag: "",
  };

  const setSelectedCountry = (country: CountryType) => {
    selectedCountry = country;
  };

  test("When there are no search results, no countries should display.", async () => {
    render(
      <Search
        countries={[]}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    );
    expect(screen.getByTestId("search-input-dropdown")).toBeInTheDocument();

    fireEvent.focus(screen.getByTestId("search-input"));
    await waitFor(() => {
      expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
      expect(screen.queryByText("Singapore")).toBeNull();
    });
  });

  test("When there are search results, countries should display.", async () => {
    render(
      <Search
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    );

    expect(screen.getByTestId("search-input-dropdown")).toBeInTheDocument();

    fireEvent.focus(screen.getByTestId("search-input"));
    await waitFor(() => {
      expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
      expect(screen.queryByText("Singapore")).toBeInTheDocument();
      expect(screen.getByAltText("Singapore Flag")).toBeInTheDocument();
    });
  });

  test("When typing into the input field, only the matching results should display.", async () => {
    render(
      <Search
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    );

    expect(screen.getByTestId("search-input-dropdown")).toBeInTheDocument();

    fireEvent.focus(screen.getByTestId("search-input"));

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "S" },
    });
    await waitFor(() => {
      expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
      expect(screen.queryByText("Greenland")).toBeNull();
      expect(screen.queryByText("Singapore")).toBeInTheDocument();
    });
  });

  test("When choosing a country, the value of the selected country is updated to the input.", async () => {
    render(
      <Search
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    );

    expect(screen.getByTestId("search-input-dropdown")).toBeInTheDocument();

    fireEvent.focus(screen.getByTestId("search-input"));

    await waitFor(() => {
      expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
      expect(screen.queryByText("Singapore")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId(`countries-Singapore-4`));

    await waitFor(() => {
      expect(selectedCountry.name).toBe("Singapore");
    });
  });
});
