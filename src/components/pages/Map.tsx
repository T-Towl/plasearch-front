import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import Container from "@mui/material/Container";
import { Shop } from "@mui/icons-material";

const containerStyle = {
  height: "60vh",
  width: "100%",
};

/* エラーテキスト */
const ErrorText = () => (
  <p className="App-error-text">geolocation IS NOT available</p>
);

const positionTokyo = {
  lat: 35.62551386235291,
  lng: 139.77614366422262
};

const divStyle = {
  background: "white",
  fontSize: 7.5
};

function Map() {

  // <表示範囲判定>
  const [neBounds, setNeBounds] = useState({lat: 0,lng: 0});
  const [swBounds, setSwBounds] = useState({lat: 0,lng: 0});

  const mapRef = React.useRef<google.maps.Map | undefined>();

  const onMapLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onMapBoundsChanged = React.useCallback(() => {
  //↓表示範囲の北東・南西の座標を取得
    const neLatlng = mapRef?.current?.getBounds()?.getNorthEast();
    const swLatlng = mapRef?.current?.getBounds()?.getSouthWest();
  //取得した座標をセット
    if (neLatlng?.lat() && neLatlng?.lng()) {
      setNeBounds({lat: neLatlng?.lat(), lng: neLatlng?.lng()});
    }
    if (swLatlng?.lat() && swLatlng?.lng()) {
      setSwBounds({lat: swLatlng?.lat(), lng: swLatlng?.lng()});
    }
  }, []);
  // </表示範囲判定>

  // <infoWindowオプション-->
  const [size, setSize] = useState<undefined | google.maps.Size>(undefined);
  const infoWindowOptions = {
    pixelOffset: size
  };
  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };

  const [LatLng, setLatLng] = useState<google.maps.LatLng | google.maps.LatLngLiteral>();
  // </infoWindowオプション-->

  // <現在地取得機能-->
  const [isAvailable, setAvailable] = useState(false);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [shops, setShops] = useState<Shop[]>([]);
  type Shop = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    address :string
    opening_hours :number
    photo_reference :string
    rating :number
  };

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
    // ↓Railsからデータを取得
    axios.get(
      'http://localhost:3001/api/v1/shops')
      .then(res => {setShops(res.data)})
      .catch(error => console.log(error));
  }, [isAvailable]);

  const shopsData = useRef();

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setPosition({ lat: position.coords.latitude, lng: position.coords.longitude});
      }
    );
  };
  // </現在地取得機能-->

  // <座標データ取得 未実装>
  const [nearbyShops, setNearbyShops] = useState<Shop[]>([]);
  const searchNearbyShops = () => {
    const result = shops.filter(
      (shops) =>
        shops.lat < neBounds.lat &&
        shops.lat > swBounds.lat &&
        shops.lng < neBounds.lng &&
        shops.lng > swBounds.lng
    );
    setNearbyShops(result);
    console.log(shops);
  };

  // </座標データ取得 未実装>

  // useEffect実行前であれば、"Loading..."という呼び出しを表示させます
  if (isFirstRef.current) return <div className="App">Loading...</div>;

  return (
    <Container sx={{ py: 4 }} maxWidth="md">
      <LoadScript
        googleMapsApiKey="AIzaSyDIiOCQLbf1pBeL4JgKiu0gQkdIE6OsfAg"
        onLoad={() => createOffsetSize()}
      >
        {!isFirstRef && !isAvailable && <ErrorText />}
        <GoogleMap 
          mapContainerStyle={containerStyle}  
          center={position} 
          onLoad={onMapLoad}
          onBoundsChanged={onMapBoundsChanged}
          zoom={13}
        >
          
          {/* Railsから取得したデータを、Marker地図上に表示 */}
          {nearbyShops.map((nearbyShop, index) => (
            <>
              <Marker 
                position={{ lat: Number(nearbyShop.lat), lng: Number(nearbyShop.lng) }} 
                key={`marker-${index}`} 
              />
              <InfoWindow 
                position={{ lat: Number(nearbyShop.lat), lng: Number(nearbyShop.lng) }} 
                options={infoWindowOptions} 
                key={`info-${index}`}
              >
                <div style={divStyle}>
                  <h1>{nearbyShop.name}</h1>
                </div>
              </InfoWindow>
            </>
          ))}

        </GoogleMap>
      </LoadScript>
      <button onClick={searchNearbyShops}>周辺のお店を探す</button>
      <p>{neBounds?.lat} : {neBounds?.lng}</p>
      <p>{swBounds?.lat} : {swBounds?.lng}</p>
    </Container>
  );
};

export default Map;
