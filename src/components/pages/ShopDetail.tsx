import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import { LoggedInStatus } from '../../App'

import { styled } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// <Map基本情報>
const containerStyle = {
  height: "60vh",
  width: "100%"
};
// infoWindow style
const divStyle = {
  background: "white",
  fontSize: 7.5
};
// </Map基本情報>

// <折り畳み機能>
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
//</折り畳み機能>

function ShopDetail() {

  const loggedInStatus = useContext(LoggedInStatus)

  // params id を受け取る
  const { id } = useParams();
  // 折り畳み機能 on/off
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // shopデータの型
  const [shop, setShop] = useState<Shop | undefined>(undefined);
  type Shop = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    phone_number: string;
    post_code: string;
    address: string;
    opening_hours: string;
    photo_reference: string;
    rating: number;
    place_id: string;
  };
  // Railsからparams id と同じidのデータを取得
  useEffect(() => {
    // isFirstRef.current = false;
<<<<<<< HEAD
    axios.get(`https://classique-chaise-00920.herokuapp.com/api/v1/shops/${id}`)
=======
    axios.get(`http://localhost:3001/api/v1/shops/${id}`)
>>>>>>> origin/user_loginout
         .then(res => {setShop(res.data)
               console.log("Rails Api からデータを取得");
               console.log(res.data);
              })
         .catch(error => console.log(error))
  },[id]);

  // <InfoWindow詳細設定>
  const [size, setSize] = useState<google.maps.Size>();
  const infoWindowOptions = {
    pixelOffset: size
  };
  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };
  // </InfoWindow詳細設定>

  // 自作のDBを使用するため機能を一時停止↓
  // <Googla Place Api 店鋪情報取得機能>
  // const [shopData, setShopData] = useState<any>([]);
  // const [request, setRequest] = useState<Request>({
  //   placeId: "",
  //   fields: []
  // });
  // type Request = {
  //   placeId: string;
  //   fields: any[];
  // };

  // const fieldsRequest = [
  //   "address_component",
  //   "adr_address",
  //   "business_status",
  //   "business_status",
  //   "formatted_address",
  //   "geometry",
  //   "icon",
  //   "icon_mask_base_uri",
  //   "icon_background_color",
  //   "name",
  //   // //
  //   // "permanently_closed",
  //   "photo",
  //   "place_id",
  //   "plus_code",
  //   "type",
  //   "url",
  //   // //
  //   // "utc_offset",
  //   "utc_offset_minutes",
  //   "vicinity"
  // ];

  // useEffect(() => {
  //   setRequest({
  //     placeId: `${shop?.place_id}`,
  //     fields: fieldsRequest
  //   });
  // },[shop]);

  // function callback(place: any, status: any) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     setShopData(place);
  //     console.log(place);
  //   }
  // };

  // const onMapLoad = useCallback((map: google.maps.Map) => {
  //     new google.maps.places.PlacesService(map).getDetails(request, callback);
  // }, [request]);
  // </Googla Place Api  店鋪情報取得機能>

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container 
          spacing={4} 
          direction="column"
          alignItems="center"
          // justify="center"
        >
          <Grid item key={shop?.id} xs={12}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <CardHeader
                className="card"
                title={shop?.name}
                // subheader={shop.address}
              />
              <CardMedia
                component={"img"}
                sx={{
                  height: "100%"
                }}
                image={shop?.photo_reference}
                alt="image"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Rating name="simple-controlled" value={shop?.rating} max={5} />
                <Typography paragraph component="h2">
                  Googleでの評価：☆{shop?.rating}
                </Typography>
                <Typography paragraph component="h2">
                  住所：
                  {shop?.post_code}
                  <br />
                  {shop?.address}
                </Typography>
                <Typography paragraph component="h3">
                  営業時間：{shop?.opening_hours}
                </Typography>
<<<<<<< HEAD

=======
>>>>>>> origin/user_loginout
                {/* ↓Google Place APIからデータを取得する場合は以下の記法を用いる */}
                {/* <Typography paragraph>
                  {(shopData?.address_components || [])[5]?.long_name}
                </Typography> */}

              </CardContent>
              <CardActions disableSpacing>
                {loggedInStatus === "未ログイン" ?
                  <>
                  </>
                :
                  <>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ChatBubbleIcon />
                    </IconButton>
                  </>
                }
                <div style={{ flexGrow: 1 }}></div>
                <Typography>
                  Googel Map で確認する
                </Typography>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_API_KEY || ""}
                    onLoad={() => createOffsetSize()}
                    libraries={["places"]}
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{
                      lat: Number(shop?.lat), 
                      lng: Number(shop?.lng) 
                    }}
                    // onLoad={onMapLoad}
                    // onBoundsChanged={onMapBoundsChanged}
                    zoom={17}
                  >
                    <div>
                      <Marker position={{
                                lat: Number(shop?.lat), 
                                lng: Number(shop?.lng) 
                              }} 
                      />
                      <InfoWindow position={{
                                    lat: Number(shop?.lat), 
                                    lng: Number(shop?.lng) 
                                  }} 
                                  options={infoWindowOptions}
                      >
                        <div style={divStyle}>
                          <h1>{shop?.name}</h1>
                          <p>{shop?.address}</p>
                          <Button href="#">Goolge Map で開く</Button>
                        </div>
                      </InfoWindow>
                    </div>
                  </GoogleMap>
                </LoadScript>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ShopDetail;
