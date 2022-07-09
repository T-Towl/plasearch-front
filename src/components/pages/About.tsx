import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function About() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6
      }}
    >
      <Container maxWidth="sm">
        <Typography align="center" color="text.secondary" paragraph>
          西暦2022年。人類が、ガンプラを作るようになって、すでに半世紀。
          <br />
          ガンプラ愛から最も遠いところにいる転売ヤー達は、「ガンプラお譲りします業者」を名乗りガンプラファンに転売戦争を挑んできた。
          <br />
          数ヶ月余りの戦いで転売ヤーとガンプラファンは、総ガンプラの半分を死に至らしめ、ガンプラファン劣勢のまま戦争は膠着状態に陥る…
          <br />
          <br />
          その戦禍の中、一つのサイトが立ち上がった
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
          <Button variant="outlined" component={Link} to="/shops">
            キーワードから探す
          </Button>
          {/* <Button variant="outlined" component={Link} to="/search">
            Seach Sample
          </Button> */}
        </Stack>
      </Container>
    </Box>
  );
}
export default About;
