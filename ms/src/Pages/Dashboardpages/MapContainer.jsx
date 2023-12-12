import React, { useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const MapContainer = withScriptjs(
  withGoogleMap((props) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
console.log(props.locations,"locations")
useEffect(()=>{
props.locations.map((item,index)=>{
    console.log(item.signIn,"items")
   const x= extractCoordinates(item.signIn)[0]
   console.log("x",x)
    console.log(item.signIn[0])})
},[])
function extractCoordinates(inputString) {
  const regex = /\(([^,]+),\s([^)]+)\)/;
  const match = inputString.match(regex);

  if (match) {
    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);

    return [latitude, longitude];
  } else {
    console.error("Invalid data format");
    return null;
  }
}

// Example usage
// const inputString = "(18.5204303, 73.8567437)";
// const coordinates = extractCoordinates(inputString);

// if (coordinates) {
//   console.log("Latitude:", coordinates[0]);
//   console.log("Longitude:", coordinates[1]);
// }

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 18.5204303, lng: 73.8567437 }}
      >
        {props.locations.map((location, index) => (
          <Marker
            key={index}
            position={{
              lat: extractCoordinates(location.signIn)[0],
              lng: extractCoordinates(location.signIn)[1],
            }}
            onClick={() => setSelectedMarker(location)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker[0], lng: selectedMarker[1] }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <p>
                Location: {selectedMarker[0]}, {selectedMarker[1]}
              </p>
              {/* Add any other information you want to display */}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  })
);

export default MapContainer;
