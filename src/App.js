import React from "react";
import Navigation from "./app/components/Navigation";
import { FiltersContext } from "./app/context/FiltersContext";
import MapView from "./app/pages/MapView";

const App = () => {

  const [countries, setCountries] = React.useState([]);
  const addCountry = (code) => {
    const newState = countries;
    if (typeof code === "string") {
      newState.push(code);
    } else {
      code.forEach((c) => newState.push(c));
    }
    setCountries(newState.filter((v, i, s) => s.indexOf(v) === i)); // Removes duplicates while saving
  };
  const removeCountry = (code) => {
    const newState = countries;
    const index = newState.indexOf(code);
    if (index > -1) {
      newState.splice(index, 1);
    }
    setCountries(newState.filter((v, i, s) => s.indexOf(v) === i));
  };
  const value = { countries, addCountry, removeCountry, setCountries };

  return (
    <FiltersContext.Provider value={value}>
      <div>
        <Navigation />
        <MapView />
      </div>
    </FiltersContext.Provider>
  );
};
export default App;
