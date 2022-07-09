import React, { useState, useEffect, useRef, useCallback } from "react";
import "./PageStyles.scss";
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
// import { integerPropType } from "@mui/utils";

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

function Shops() {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // <Railsからデータ取得>
  const [isAvailable, setAvailable] = useState(false);
  const [shops, setShops] = useState<Shop[]>([]);

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

  // useEffectが実行されているかどうかを判定するために用意しています
  const isFirstRef = useRef(true);
  
  /*
  * ページ描画時にGeolocation APIが使えるかどうかをチェックしています
  * もし使えなければその旨のエラーメッセージを表示させます
  */
  useEffect(() => {
    isFirstRef.current = false;
    axios.get('http://localhost:3001/api/v1/shops')
         .then(res => {setShops(res.data)
               console.log("Rails Api からデータを取得");
              })
         .catch(error => console.log(error))
  },[isAvailable]);
  // </Railsからデータ取得>

  // <検索機能>
  // 入力キーワード
  const [keyword, setKeyword] = useState("");
  // itemsのListを表示・非表示を切替。onClick で true を渡して表示させる
  const [showLists, setShowLists] = useState(true);
  // List 形式で表示するデータ。初期値では検索キーワードを入力していないので上で定義した
  // shops を全件渡している
  const [filteredShops, setFilteredShops] = useState<Shop[]>(shops);

  const Search = () => {
    if (keyword === "") {
      setFilteredShops(shops);
      return;
    }

    const searchKeywords = keyword
      .trim()
      .toLowerCase()
      .match(/[^\s]+/g);

    //入力されたキーワードが空白のみの場合
    if (searchKeywords === null) {
      setFilteredShops(shops);
      return;
    }

    const result = shops.filter((shop) =>
      searchKeywords.every((kw) => (shop.name.toLowerCase().indexOf(kw) !== -1 || shop.address.toLowerCase().indexOf(kw) !== -1))
    );

    const noResult: Shop[] = [
      {
        id: 0,
        name: "No Item Found",
        lat: 0,
        lng: 0,
        address: "",
        opening_hours: 0,
        photo_reference: "https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage_%E3%83%92%E3%82%9A%E3%82%AF%E3%83%88-760x460.png",
        rating :0,
        place_id :""
      }
    ];

    setFilteredShops(result.length ? result : noResult);
  };
  // </検索機能>


  const [shopData, setShopData] = useState<any>([]);

  const [request, setRequest] = useState({
    placeId: "",
    fields: [
      "address_component",
      "adr_address",
      "business_status",
      "business_status",
      "formatted_address",
      "geometry",
      "icon",
      "icon_mask_base_uri",
      "icon_background_color",
      "name",
      // //
      "permanently_closed",
      "photo",
      "place_id",
      "plus_code",
      "type",
      "url",
      // //
      // "utc_offset",
      "utc_offset_minutes",
      "vicinity"
    ]
  });

  function callback(place: any, status: any) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      setShopData([...shopData, place]);
      console.log(place);
    }
  }

  const onMapLoad = useCallback((map: google.maps.Map) => {
    // {shops.map((shop) => (
    //   setRequest({placeId: {shop.place_id}})
      new google.maps.places.PlacesService(map).getDetails(request, callback);
    // ))}
  }, [request]);


  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={0} direction="column" alignItems="center">
          <Grid item xs={3}>
            <TextField
              id="field"
              color="secondary"
              variant="outlined"
              label="enter keywords"
              onChange={(e) => setKeyword(e.target.value)}
              onClick={() => setShowLists(true)}
            />
            <Button variant="outlined" onClick={Search}>
              検索
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
        {showLists &&
            filteredShops.map((shop, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {/* <LoadScript
                  googleMapsApiKey="AIzaSyDIiOCQLbf1pBeL4JgKiu0gQkdIE6OsfAg"
                  libraries={["places"]}
                >
                  <GoogleMap onLoad={onMapLoad}></GoogleMap>
                </LoadScript> */}
                <CardHeader
                  className="card"
                  component={Link}
                  to="/post/1"
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
                  title={shop.name}
                  subheader={shop.address}
                />
                <CardMedia
                  component={"img"}
                  sx={{
                    height: "250px",
                    width: "100%",
                    pt: "10%"
                  }}
                  image={shop.photo_reference}
                  alt="image"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography paragraph>
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
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Shops;
