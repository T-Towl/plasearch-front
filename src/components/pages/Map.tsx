import React, { useState, useEffect, useRef } from "react";
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

/* エラーテキスト */
const ErrorText = () => (
  <p className="App-error-text">geolocation IS NOT available</p>
);

// const positionTokyo = {
//   lat: 35.62551386235291,
//   lng: 139.77614366422262
// };

// const positionYokohama = {
//   lat: 35.44670550526705,
//   lng: 139.65406751562722
// };

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

  const [isAvailable, setAvailable] = useState(false);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  // useEffectが実行されているかどうかを判定するために用意しています
  const isFirstRef = useRef(true);

  /*
  * ページ描画時にGeolocation APIが使えるかどうかをチェックしています
  * もし使えなければその旨のエラーメッセージを表示させます
  */
  useEffect(() => {
    isFirstRef.current = false;
    if ('geolocation' in navigator) {
      setAvailable(true);
    }
    getCurrentPosition();
  }, [isAvailable]);

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setPosition({ lat: position.coords.latitude, lng: position.coords.longitude});
      }
    );
  };

  // useEffect実行前であれば、"Loading..."という呼び出しを表示させます
  if (isFirstRef.current) return <div className="App">Loading...</div>;


  return (
    <Container sx={{ py: 4 }} maxWidth="md">
      <LoadScript
        googleMapsApiKey="AIzaSyDIiOCQLbf1pBeL4JgKiu0gQkdIE6OsfAg"
        onLoad={() => createOffsetSize()}
      >
        {!isFirstRef && !isAvailable && <ErrorText />}
        <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={13}>
          {/* <Marker position={positionTokyo} /> */}
          {/* <Marker position={positionYokohama} /> */}
          {/* <InfoWindow position={positionTokyo} options={infoWindowOptions}>
            <div style={divStyle}>
              <h1>ガンダムベース東京</h1>
            </div>
          </InfoWindow> */}
          {/* <InfoWindow position={positionYokohama} options={infoWindowOptions}>
            <div style={divStyle}>
              <h1>GUNDAM FACTORY YOKOHAMA</h1>
            </div>
          </InfoWindow> */}
        </GoogleMap>
      </LoadScript>
    </Container>
  );
};

export default Map;
