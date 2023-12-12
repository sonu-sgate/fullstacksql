

import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapContainer = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 18.5204303, lng: 73.8567437 }}
    >
      {props.locations.map((location, index) => (
        <Marker key={index} position={{ lat: location[0], lng: location[1] }} />
      ))}
    </GoogleMap>
  ))
);

export default MapContainer;
