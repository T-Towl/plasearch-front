import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// import { Shop } from "@mui/icons-material";

const containerStyle = {
  height: "60vh",
  width: "100%",
};

/* エラーテキスト */
const ErrorText = () => (
  <p className="App-error-text">geolocation IS NOT available</p>
);

const divStyle = {
  background: "white",
  fontSize: 7.5
};

function Map() {

  // <infoWindowオプション-->
  const [size, setSize] = useState<undefined | google.maps.Size>();
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
  const [shops, setShops] = useState<Shop[]>([]);
  type Shop = {
    id: number
    name: string
    lat: number
    lng: number
    phone_number: string
    post_code: string
    address: string
    opening_hours: string
    photo_reference: string
    rating: number
    place_id: string
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
      `${process.env.REACT_APP_BACK_ORIGIN}/api/v1/shops`)
      .then(res => {setShops(res.data); console.log("Rails Api からデータを取得");})
      .catch(error => console.log(error));
  }, [isAvailable]);

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setPosition({ lat: position.coords.latitude, lng: position.coords.longitude});
      }
    );
  };
  // </現在地取得機能-->

  // <表示範囲判定>
  const [neBounds, setNeBounds] = useState({lat: 0,lng: 0});
  const [swBounds, setSwBounds] = useState({lat: 0,lng: 0});
  const [centerBounds, setCenterBounds] = useState({ lat: 0, lng: 0 });

  const mapRef = React.useRef<google.maps.Map | undefined>();

  const onMapLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onMapBoundsChanged = React.useCallback(() => {
  //↓表示範囲の北東・南西・中心の座標を取得
    const neLatlng = mapRef?.current?.getBounds()?.getNorthEast();
    const swLatlng = mapRef?.current?.getBounds()?.getSouthWest();
    const centerLatlng = mapRef?.current?.getBounds()?.getCenter();

  //取得した座標をセット
    if (neLatlng?.lat() && neLatlng?.lng()) {
      setNeBounds({lat: neLatlng?.lat(), lng: neLatlng?.lng()});
    }
    if (swLatlng?.lat() && swLatlng?.lng()) {
      setSwBounds({lat: swLatlng?.lat(), lng: swLatlng?.lng()});
    }
    if (centerLatlng?.lat() && centerLatlng?.lng()) {
      setCenterBounds({ lat: centerLatlng?.lat(), lng: centerLatlng?.lng() });
    }
    // コンソールに出力
    console.log("座標を取得しました");
  }, []);
  // </表示範囲判定>

  // <表示範囲の座標データ取得>
  const [nearbyShops, setNearbyShops] = useState<Shop[]>([]);
  const searchNearbyShops = () => {
    const result = shops.filter(
      (shop) =>
        shop.lat < neBounds.lat &&
        shop.lat > swBounds.lat &&
        shop.lng < neBounds.lng &&
        shop.lng > swBounds.lng
    );
    setNearbyShops(result);
    console.log("表示範囲の座標データ取得");
  };
  // </表示範囲の座標データ取得>

  // useEffect実行前であれば、"Loading..."という呼び出しを表示させます
  if (isFirstRef.current) return <div className="App">Loading...</div>;

  return (
    <>
      <Container sx={{ py: 2 }}>
      <Stack sx={{ pt: 1 }}
             direction="row"
             justifyContent="right"
      >
        <Button variant="outlined" component={Link} to="/shops">
          キーワードから探す
        </Button>
      </Stack>
      </Container>
      <Container sx={{ py: 4 }} maxWidth="md">
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_API_KEY || ""}
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
            <Marker position={centerBounds} />
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
                    <p>{nearbyShop.address}</p>
                    <Button href={`/shopDetail/${nearbyShop.id}`} variant="outlined">
                      店鋪詳細
                    </Button>
                  </div>
                </InfoWindow>
              </>
            ))}

          </GoogleMap>
        </LoadScript>
        <Container sx={{ py: 2 }}>
          <Button onClick={searchNearbyShops} 
                  variant="contained"
          >
            周辺のお店を探す
          </Button>
        </Container>
        {/* <p>{neBounds?.lat} : {neBounds?.lng}</p>
        <p>{swBounds?.lat} : {swBounds?.lng}</p> */}
      </Container>
    </>
  );
};

export default Map;