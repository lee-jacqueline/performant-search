/**
 * Search with a dropdown of countries that matches the input text
 *
 * Parameters
 * @param {Array<CountryType>} countries list of countries to display in the dropdown
 * @param {CountryType} selectedCountry the country state that is selected
 * @param {function} setSelectedCountry function to set the selected country state
 */

import React, { useState, useEffect } from "react";
import { CountryType, InitialCountry } from "../../App";
import "./Search.css";

interface SearchProps {
  countries: Array<CountryType>;
  selectedCountry: CountryType;
  setSelectedCountry: (country: CountryType) => void;
}

const Search: React.FC<SearchProps> = ({
  countries,
  selectedCountry,
  setSelectedCountry,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [newCountryArray, setNewCountryArray] =
    useState<Array<CountryType>>(countries);

  useEffect(() => {
    if (newCountryArray.length === 0 && searchText === "")
      setNewCountryArray(countries);
  }, [countries, newCountryArray, searchText, setNewCountryArray]);

  const searchOnChange = (inputText: string) => {
    if (selectedCountry !== InitialCountry) {
      setSelectedCountry(InitialCountry);
    }
    setSearchText(inputText);
    setNewCountryArray(
      countries.filter((country) =>
        country.name.toLowerCase().includes(inputText.toLowerCase())
      )
    );
  };

  return (
    <div data-testid="search-input-dropdown" className="input-dropdown">
      <input
        data-testid="search-input"
        type="text"
        className="input-text dropdown"
        placeholder="Select"
        value={searchText ? searchText : selectedCountry.name}
        onChange={(e) => searchOnChange(e.target.value)}
      />
      <div data-testid="dropdown-content" className="dropdown-content">
        <ul>
          {newCountryArray.map((country, i) => (
            <li
              key={`countries-${country.name}-${i}`}
              data-testid={`countries-${country.name}-${i}`}
              onClick={() => {
                setSelectedCountry(country);
                setSearchText("");
              }}
            >
              <img src={country.flag} alt={`${country.name} Flag`} />{" "}
              {country.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
