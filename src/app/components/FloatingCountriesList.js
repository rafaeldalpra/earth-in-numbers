import React from "react";
import { FiltersContext } from "../context/FiltersContext";
import { makeStyles } from "@material-ui/core/styles";
import { countryToFlag } from "./CountryPicker";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import DataModal from "./DataModal";

const FloatingCountriesList = () => {
  const classes = useStyles();
  const { countries, removeCountry, setCountries } = React.useContext(
    FiltersContext
  );

  if (countries.length === 0) {
    return "";
  }

  return (
    <div className={classes.container}>
      <button className={classes.pill} onClick={() => setCountries([])}>
        <ClearAllIcon />
      </button>
      <DataModal />
      {countries.map((code) => {
        return (
          <button className={classes.pill} onClick={() => removeCountry(code)}>
            {countryToFlag(code)}
          </button>
        );
      })}
    </div>
  );
};

export default FloatingCountriesList;

const useStyles = makeStyles(() => ({
  container: {
    position: "fixed",
    zIndex: 99999,
    top: "80px",
    right: 0,
    padding: "3px 0",
    background: "#fff",
  },
  pill: {
    border: "none",
    backgroundColor: "transparent",
    padding: "3px 10px",
    float: "left",
    clear: "both",
    cursor: "pointer",
  },
}));
