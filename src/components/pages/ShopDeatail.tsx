import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import axios from "axios";

import { styled } from '@mui/material/styles';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FeedIcon from '@mui/icons-material/Feed';

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

function ShopDetails() {
  // params id を受け取る
  const { id } = useParams();
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [shop, setShop] = useState<Shop>();
  type Shop = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    address: string;
    opening_hours: number;
    photo_reference: string;
    rating: number;
    place_id: string;
  };

  useEffect(() => {
    // isFirstRef.current = false;
    axios.get(`http://localhost:3001/api/v1/shops/${id}`)
         .then(res => {setShop(res.data)
               console.log("Rails Api からデータを取得");
               console.log(res.data);
              })
         .catch(error => console.log(error))
  },[]);
  
  // <店鋪情報取得機能>
  const [shopData, setShopData] = useState<any>([]);
  const [request, setRequest] = useState({
    placeId: `${shop?.place_id}`,
    // placeId: `ChIJIy1S0_mJGGAR2d0UgvPKUPg`,
    fields: [
      "address_component",
      // "adr_address",
      // "business_status",
      // "business_status",
      // "formatted_address",
      // "geometry",
      // "icon",
      // "icon_mask_base_uri",
      // "icon_background_color",
      "name",
      // //
      // "permanently_closed",
      // "photo",
      // "place_id",
      // "plus_code",
      // "type",
      // "url",
      // //
      // "utc_offset",
      // "utc_offset_minutes",
      // "vicinity"
    ]
  });

  function callback(place: any, status: any) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      setShopData(place);
      console.log(place);
    }
  }

  const onMapLoad = useCallback((map: google.maps.Map) => {
      new google.maps.places.PlacesService(map).getDetails(request, callback);
  }, [request]);
  // </店鋪情報取得機能>

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
        {/* {shops.map((shop, i) => ( */}
            <Grid item key={shop?.id} >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <LoadScript
                  googleMapsApiKey="AIzaSyDIiOCQLbf1pBeL4JgKiu0gQkdIE6OsfAg"
                  libraries={["places"]}
                >
                  <GoogleMap onLoad={onMapLoad}></GoogleMap>
                </LoadScript>
                <CardHeader
                  className="card"
                  // component={Link}
                  // to={`/shopdetails/${Number(shops?.id)}`}
                  action={
                    <IconButton 
                      aria-label="settings" 
                      component={Link}
                      to={`/shopdetails/${Number(shop?.id)}`}
                      // color="inherit"
                    >
                      <FeedIcon />
                    </IconButton>
                  }
                  title={shopData.name}
                  // subheader={shops.address}
                />
                <CardMedia
                  component={"img"}
                  sx={{
                    height: "300px"
                  }}
                  image={shop?.photo_reference}
                  alt="image"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography paragraph>
                    {shop?.place_id}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ChatBubbleIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                  <Typography paragraph></Typography>
                      <Typography paragraph>{shop.address}</Typography>
                      <Typography paragraph>
                        営業時間:{shop.opening_hours}
                      </Typography>
                      <Typography paragraph>H</Typography>
                      <Typography paragraph>A</Typography>
                      <Typography>S</Typography>
                  </CardContent>
                </Collapse> */}
              </Card>
            </Grid>
          {/* ))} */}
        </Grid>
      </Container>
    </>
  );
}

export default ShopDetails;
