import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import ApiCall from "../fetch-components/RestCountries";
import GoogleMapReact from "google-map-react";
import googleMapStyles from "../data/googleMapStyles.json";
import MapMarker from "../components/MapMarker";
import MapBoxView from "../components/MapBoxView";
import { FiltersContext } from "../context/FiltersContext";
import FloatingCountriesList from "../components/FloatingCountriesList";

const MapView = () => {
  const { countries } = React.useContext(FiltersContext);

  return (
    <ApiCall endpoint={"all"}>
      {({ isLoading, error, json }) => {
        if (isLoading) {
          return <LinearProgress color="secondary" />;
        }

        const markers = countries.map((code) => {
          const data = json.filter((item) => item.alpha2Code === code)[0];
          if (!data) {
            return "";
          }
          return (
            <MapMarker lat={data.latlng[0]} lng={data.latlng[1]} data={data} />
          );
        });

        return <WorldMap markers={markers} />;
      }}
    </ApiCall>
  );
};

export default MapView;

const WorldMap = ({ center, zoom, markers }) => {
  return (
    <Box height="100vh">
      <FloatingCountriesList />
      {process.env.REACT_APP_MAPS_LIBRARY === "mapbox" && (
        <MapBoxView center={center} zoom={zoom} markers={markers} />
      )}
      {process.env.REACT_APP_MAPS_LIBRARY === "google" && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GMAPS_KEY,
          }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={{ styles: googleMapStyles }}
        >
          {markers.map((marker) => marker)}
        </GoogleMapReact>
      )}
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
