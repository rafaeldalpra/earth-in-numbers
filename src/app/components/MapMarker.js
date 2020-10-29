import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";

const MapMarker = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.marker}>
      <span>
        <strong>{data.name}</strong>
        <br />
        Population:{" "}
        {
          <NumberFormat
            value={data.population}
            displayType={"text"}
            thousandSeparator={true}
          />
        }
      </span>
    </div>
  );
};

MapMarker.defaultProps = {
  countryCode: null,
};

const useStyles = makeStyles((theme) => ({
  flag: {
    marginRight: "5px ",
  },
  marker: {
    padding: "2px 5px 4px",
    fontSize: 14,
  },
}));

export default MapMarker;
