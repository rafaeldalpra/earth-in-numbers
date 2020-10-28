import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { makeStyles } from "@material-ui/core/styles";
import { renderToString } from "react-dom/server";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapBoxView = ({ center, zoom, markers }) => {
  const classes = useStyles();
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [center.lng, center.lat],
      zoom,
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on("load", () => {
      markers.map((item) => {
        let marker = new mapboxgl.Marker()
          .setPopup(new mapboxgl.Popup().setHTML(renderToString(item)))
          .setLngLat([center.lng, center.lat])
          .addTo(map);
        marker.togglePopup();
      });
    });

    return () => map.remove();
  }, [center.lat, center.lng, zoom]);

  return <div className={classes.mapWrapper} ref={mapContainerRef} />;
};

MapBoxView.defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 1,
  markers: [],
};

export default MapBoxView;

const useStyles = makeStyles((theme) => ({
  mapWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}));
