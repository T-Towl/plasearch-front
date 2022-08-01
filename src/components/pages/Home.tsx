import React, { useContext, createContext } from "react";
import { LoggedInStatus, HandleLogin } from '../Main'
import Registration from '../auth/Registration'
import Login from '../auth/Login'

import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const defaultValue = () => {}
export const HandleSuccessfulAuthentication = createContext<((data: any) => void) | undefined>(undefined);

function Home() {
  let navigation = useNavigate();
  const loggedInStatus = useContext(LoggedInStatus)
  const handleLogin = useContext(HandleLogin)

  const handleSuccessfulAuthentication = (data: any) => {
    !!handleLogin && handleLogin(data)
    navigation("/dashboard")
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6
      }}
    >
      <h2>ログイン状態: {loggedInStatus}</h2>
      
      <HandleSuccessfulAuthentication.Provider value={handleSuccessfulAuthentication}>
        <Registration  />
        <Login />
      </HandleSuccessfulAuthentication.Provider>

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
          align="center" 
          color="text.secondary" 
          paragraph
        >
          今すぐガンプラを作りたい！！ そんなあなたに
          <br />
          近くのプラモ屋を検索してみよう！
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
        </Stack>
      </Container>
    </Box>
  );
}
export default Home;
