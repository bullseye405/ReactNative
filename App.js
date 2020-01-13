import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import { compose, withProps } from "recompose";
import React, { useState, useEffect } from "react";
import { usePosition } from "./src/Location/UsePosition";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap defaultZoom={8} defaultCenter={props.location}>
      {props.isMarkerShown && (
        <Marker position={props.location} onClick={props.onMarkerClick} />
      )}
    </GoogleMap>
  );
});

const App = () => {
  let [isMarkerShown, setShowMarker] = useState(false);
  let [myLocation, setLocation] = useState({});
  const { latitude, longitude, error } = usePosition();

  useEffect(() => {
    delayedShowMarker();
  }, []);
  let delayedShowMarker = () => {
    setTimeout(() => {
      setShowMarker(true);
    });
  };

  let handleMarkerClick = () => {
    console.log("hit");
    setShowMarker(false);
    delayedShowMarker();
  };

  return (
    <MyMapComponent
      isMarkerShown={isMarkerShown}
      onMarkerClick={handleMarkerClick}
      location={{
        lng: longitude ? longitude : 0,
        lat: latitude ? latitude : 0
      }}
    />
  );
};

export default App;
