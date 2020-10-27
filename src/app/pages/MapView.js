import React from "react";
import { useParams } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import ApiCall from "../fetch-components/RestCountries";
import GoogleMapReact from "google-map-react";
import googleMapStyles from "../data/googleMapStyles.json";
import MapMarker from "../components/MapMarker";

const Country = () => {
  const { countryCode } = useParams();
  const endpoint = countryCode ? `alpha/${countryCode}` : "all";

  return (
    <ApiCall endpoint={endpoint}>
      {({ isLoading, error, json }) => {
        if (isLoading) {
          return <LinearProgress color="secondary" />;
        }

        if (countryCode) {
          return (
            <WorldMap
              center={{ lat: json.latlng[0], lng: json.latlng[1] }}
              zoom={5}
              markers={[
                <MapMarker
                  lat={json.latlng[0]}
                  lng={json.latlng[1]}
                  data={json}
                />,
              ]}
            />
          );
        }
        return <WorldMap />;
      }}
    </ApiCall>
  );
};

export default Country;

const WorldMap = ({ center, zoom, markers }) => {
  return (
    <Box height="100vh">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBMleeIcLiP7VPwZ6q9ddBjhesN-t3yHV8",
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={{ styles: googleMapStyles }}
      >
        {markers.map((marker) => marker)}
      </GoogleMapReact>
    </Box>
  );
};

WorldMap.defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 1,
  markers: [],
};
