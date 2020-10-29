import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { makeStyles } from "@material-ui/core/styles";
import { renderToString } from "react-dom/server";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const openLabels = true;

const MapBoxView = ({ markers }) => {
  const classes = useStyles();
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/rafaeldalpra/ckgty189d0y1719oxlt8w407w",
      center: [0, 0],
      zoom: 1,
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on("load", () => {
      markers.forEach((item) => {
        if (!item.props.lng || !item.props.lat) {
          return;
        }
        const marker = new mapboxgl.Marker()
          .setPopup(new mapboxgl.Popup().setHTML(renderToString(item)))
          .setLngLat([item.props.lng, item.props.lat])
          .addTo(map);
        if (openLabels) {
          marker.togglePopup();
        }
      });
    });

    return () => map.remove();
  }, [markers]);

  return <div className={classes.mapWrapper} ref={mapContainerRef} />;
};

MapBoxView.defaultProps = {
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
