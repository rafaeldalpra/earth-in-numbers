import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import ApiCall from "../fetch-components/RestCountries";
import { FiltersContext } from "../context/FiltersContext";

const regions = {
  oceania: "Oceania",
  europe: "Europe",
  asia: "Asia",
  americas: "Americas",
  africa: "Africa",
};
const isRegion = (code) => Object.keys(regions).includes(code);

export const countryToFlag = (isoCode) => {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
};

const useStyles = makeStyles(() => ({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

const CountrySelect = () => {
  const classes = useStyles();
  const { addCountry } = useContext(FiltersContext);

  return (
    <ApiCall endpoint="all">
      {({ isLoading, json }) => {
        if (isLoading) {
          return "";
        }

        const options = json.map((item) => ({
          code: item.alpha2Code,
          label: item.name,
        }));
        const onChange = (e, selected) => {
          if (selected) {
            if (isRegion(selected.code)) {
              addCountry(
                json
                  .filter((item) => item.region === selected.label)
                  .map((item) => item.alpha2Code)
              );
              return;
            }
            addCountry(selected.code);
          }
        };
        Object.keys(regions).forEach((key) => {
          options.unshift({ code: key, label: regions[key] });
        });

        return (
          <Autocomplete
            style={{ width: 300 }}
            options={options}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(option) => {
              if (isRegion(option.code)) {
                return option.label;
              }
              return (
                <React.Fragment>
                  <span>{countryToFlag(option.code)}</span>
                  {option.label} ({option.code})
                </React.Fragment>
              );
            }}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Choose a country"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        );
      }}
    </ApiCall>
  );
};

export default CountrySelect;
