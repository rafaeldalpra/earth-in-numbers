import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { countryToFlag } from "../components/CountryPicker";
import NumberFormat from "react-number-format";

const MapMarker = ({ data }) => {
  console.log("logz DATA", data);
  const classes = useStyles();
  return (
    <div className={classes.marker}>
      <span className={classes.flag}>{countryToFlag(data.alpha2Code)}</span>
      <strong>{data.name}</strong>
      <br />
      {
        <NumberFormat
          value={data.population}
          displayType={"text"}
          thousandSeparator={true}
        />
      }
    </div>
  );
};

MapMarker.defaultProps = {
  countryCode: null,
};

const useStyles = makeStyles((theme) => ({
  flag: {
    marginRight: "5px",
  },
  marker: {
    padding: "2px 5px 4px",
    backgroundColor: "#ebf4f7",
    color: "#365a66",
    fontSize: 16,
    border: "1px solid #fff",
    minWidth: "150px",
    maxWidth: "400px",
    borderRadius: "0 0 5px 0",
  },
}));

export default MapMarker;
