import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import ApiCall from "../fetch-components/RestCountries";
import { useHistory } from "react-router-dom";

export const countryToFlag = (isoCode) => {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
};

const useStyles = makeStyles((theme) => ({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

export default function CountrySelect() {
  const classes = useStyles();
  const history = useHistory();

  const onChange = (e, selected) =>
    history.push(selected ? `/${selected.code}` : "/");

  return (
    <ApiCall endpoint="all">
      {({ isLoading, error, json }) => {
        if (isLoading) {
          return "";
        }

        const countries = json.map((item) => ({
          code: item.alpha2Code,
          label: item.name,
        }));

        return (
          <Autocomplete
            style={{ width: 300 }}
            options={countries}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (
              <React.Fragment>
                <span>{countryToFlag(option.code)}</span>
                {option.label} ({option.code})
              </React.Fragment>
            )}
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
}
