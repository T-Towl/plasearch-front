import React, { useState, useEffect, useRef, useContext } from "react";
import { LoggedInStatusContext } from '../../App'
import "./PageStyles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";

// import { styled } from '@mui/material/styles';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from '@mui/material/CardHeader';
// import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FeedIcon from '@mui/icons-material/Feed';
// import { integerPropType } from "@mui/utils";

function Shops() {

  const loggedInStatus = useContext(LoggedInStatusContext)

  // <Railsからデータ取得>
  const isAvailable = false;
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
    axios.get(`${process.env.REACT_APP_BACK_ORIGIN}/api/v1/shops`)
         .then(res => {setShops(res.data)
               console.log("Rails Api からSHOPデータ一覧を取得", res);
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
        phone_number: "-",
        post_code: "〒-",
        address: "-",
        opening_hours: "-",
        photo_reference: `${process.env.PUBLIC_URL}/noimage_picture-760x460.png`,
        rating :0,
        place_id :""
      }
    ];

    setFilteredShops(result.length ? result : noResult);
  };
  // </検索機能>

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
            <Button variant="contained" onClick={Search}>
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
                <CardHeader
                  className="card"
                  component={Link}
                  to={`/shopdetail/${Number(shop?.id)}`}
                  action={
                    <IconButton 
                      aria-label="settings" 
                      component={Link}
                      to={`/shopdetail/${Number(shop?.id)}`}
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
                  <Rating name="simple-controlled" value={shop?.rating} max={5} />
                  <Typography paragraph component="h2">
                    Googleでの評価：☆{shop?.rating}
                  </Typography>
                  <Typography paragraph component="h2">
                    住所：
                    {shop?.post_code}
                    <br/>
                    {shop?.address}
                  </Typography>
                  <Typography paragraph component="h3">
                    営業時間：{shop?.opening_hours}
                  </Typography>
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
                  <Button 
                    variant="contained"
                    component={Link}
                    to={`/shopdetail/${Number(shop?.id)}`}
                  >
                    店鋪詳細
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Shops;
