import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";

const MapMarker = ({ data }) => {
  console.log("logz DATA", data);
  const classes = useStyles();
  return (
    <div className={classes.marker}>
      <p>
        <strong>{data.name}</strong>
      </p>
      <p>
        Population:{" "}
        {
          <NumberFormat
            value={data.population}
            displayType={"text"}
            thousandSeparator={true}
          />
        }
      </p>
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
    fontSize: 14,
    p: {
      color: "red",
    },
  },
}));

export default MapMarker;
