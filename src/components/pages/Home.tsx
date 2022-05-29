import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Home() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
        >
          Pla search
        </Typography>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          ‐プラサーチ‐
        </Typography>
        <Typography 
          variant="p"
          align="center" 
          color="text.secondary" 
          paragraph
        >
          西暦2022年。人類が、ガンプラを作るようになって、すでに半世紀。
          ガンプラ愛から最も遠いところにいる転売ヤー達は、「ガンプラお譲りします」を名乗りガンプラファンに転売戦争を挑んできた。
          数ヶ月余りの戦いで転売ヤーとガンプラファンは、総ガンプラの半分を死に至らしめ、ガンプラファン劣勢のまま戦争は膠着状態に陥る…
          <br />
          <br />
          その戦禍の中、一つサイトが立ち上がった
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" component={Link} to="/map">
            マップから探す
          </Button>
          <Button variant="outlined" component={Link} to="/keyword">
            キーワードから探す
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
export default Home;
