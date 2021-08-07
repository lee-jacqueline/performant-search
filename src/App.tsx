/**
 * App
 *
 * Improvements:
 * - State is handled here but would prefer to have it in useContext
 * - API can be placed in a service folder that will serve all API requests
 */

import React from "react";
import Search from "./components/Search";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

export type CountryType = {
  name: string;
  flag: string;
};

export const InitialCountry = {
  name: "",
  flag: "",
};

const App: React.FC = () => {
  const [countries, setCountries] = useState<Array<CountryType>>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<CountryType>(InitialCountry);

  const fetchCountries = async () => {
    await fetch("https://restcountries.eu/rest/v2")
      .then((res) => res.json())
      .then((data) => {
        const countryList: CountryType[] = [];

        data.forEach((country: CountryType) => {
          countryList.push({
            name: country.name,
            flag: country.flag,
          });
        });

        setCountries(countryList);
      });
  };

  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries();
    }
  }, [countries]);

  return (
    <div className="home-page">
      <Search
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  );
};

export default App;
