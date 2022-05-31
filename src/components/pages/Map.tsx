import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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

const divStyle = {
  background: "white",
  fontSize: 7.5
};

function Map() {
  // <座標取得 未実装>
  const [shops, setShops] = useState([]);
  type shops = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    address :string
    opening_hours :number
    photo_reference :string
    rating :number
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/shops')
         .then(res => {setShops(res.data)})
         .catch(error => console.log(error))
  },[]);
  // </座標取得 未実装>

  // <infoWindowオプション-->
  const [size, setSize] = useState<undefined | google.maps.Size>(undefined);
  const infoWindowOptions = {
    pixelOffset: size
  };
  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };
  // </infoWindowオプション-->

  // <現在地取得機能-->
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
  // </現在地取得機能-->

  return (
    <Container sx={{ py: 4 }} maxWidth="md">
      <LoadScript
        googleMapsApiKey="AIzaSyDIiOCQLbf1pBeL4JgKiu0gQkdIE6OsfAg"
        onLoad={() => createOffsetSize()}
      >
        {!isFirstRef && !isAvailable && <ErrorText />}
        <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={13}>
          {/* <Marker position={positionTokyo} /> */}
          {/* <InfoWindow position={positionTokyo} options={infoWindowOptions}>
            <div style={divStyle}>
              <h1>ガンダムベース東京</h1>
            </div>
          </InfoWindow> */}
        </GoogleMap>
      </LoadScript>
    </Container>
  );
};

export default Map;
