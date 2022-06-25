import React, { useState, useEffect, useRef } from "react";
import "./PageStyles.scss";
import axios from "axios";
import Button from "@mui/material/Button";
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

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {shops.map((shop) => (
          <Grid item key={shop.id} xs={12} sm={6} md={4}>
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
  );
}

export default Keyword;
