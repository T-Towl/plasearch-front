import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import Container from "@mui/material/Container";

const containerStyle = {
  height: "60vh",
  width: "100%",
};

const center = {
  lat: 35.62551386235291,
  lng: 139.77614366422262,
};

const positionTokyo = {
  lat: 35.62551386235291,
  lng: 139.77614366422262
};

const positionYokohama = {
  lat: 35.44670550526705,
  lng: 139.65406751562722
};

const divStyle = {
  background: "white",
  fontSize: 7.5
};

function Map() {
  const [size, setSize] = useState<undefined | google.maps.Size>(undefined);
  const infoWindowOptions = {
    pixelOffset: size
  };
  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };
  return (
    <Container sx={{ py: 4 }} maxWidth="md">
      <LoadScript
        googleMapsApiKey="AIzaSyDIiOCQLbf1pBeL4JgKiu0gQkdIE6OsfAg"
        onLoad={() => createOffsetSize()}
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
          <Marker position={positionTokyo} />
          <Marker position={positionYokohama} />
          <InfoWindow position={positionTokyo} options={infoWindowOptions}>
            <div style={divStyle}>
              <h1>ガンダムベース東京</h1>
            </div>
          </InfoWindow>
          <InfoWindow position={positionYokohama} options={infoWindowOptions}>
            <div style={divStyle}>
              <h1>GUNDAM FACTORY YOKOHAMA</h1>
            </div>
          </InfoWindow>
        </GoogleMap>
      </LoadScript>
    </Container>
  );
};

export default Map;
