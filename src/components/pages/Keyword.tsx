import React, { useState, useEffect, useRef } from "react";
import "./PageStyles.scss";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { integerPropType } from "@mui/utils";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Keyword() {

  // <Railsからデータ取得>
  const [isAvailable, setAvailable] = useState(false);
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
  const [showLists, setShowLists] = useState(false);
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
        rating :0
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
            <Button variant="outlined" onClick={Search}>
              検索
            </Button>
          </Grid>
        </Grid>
      {/* </Container>

      <Container sx={{ py: 8 }} maxWidth="md"> */}
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
                <CardMedia
                  component="img"
                  sx={{
                    pt: "10%"
                  }}
                  image={shop.photo_reference}
                  alt="image"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <p className="shopName">{shop.name}</p>
                    <p className="shopAddress">{shop.address}</p>
                    <p className="shopRating">Googleで☆{shop.rating}</p>
                    <p className="shopOpneHours">営業時間{shop.opening_hours}</p>
                    latitude: {shop.lat}
                    longitude: {shop.lng}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">いいね！（実装中）</Button>
                  <Button size="small">口コミ（実装中）</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Keyword;
