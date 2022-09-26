import React, { useContext, createContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import { LoggedInStatusContext, HandleLoginContext, HandleLogoutContext, UserContext } from '../../App'
import Registration from './Registration'
import Login from './Login'
import Logout from './Logout'

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const HandleSuccessfulAuthentication = createContext<((data: any) => void) | undefined>(undefined);
export const HandleUnsuccessfulAuthentication = createContext<(() => void) | undefined>(undefined);

function User() {
    const navigation = useNavigate();
    const loggedInStatus = useContext(LoggedInStatusContext)
    const handleLogin = useContext(HandleLoginContext)
    const handleLogout = useContext(HandleLogoutContext)
    const user = useContext(UserContext)

    const handleSuccessfulAuthentication = (data: any) => {
      !!handleLogin && handleLogin(data)
      navigation("/user")
    }
    const handleUnsuccessfulAuthentication = () => {
      !!handleLogout && handleLogout()
      navigation("/user")
    }

    const theme = createTheme();

    return (
      <>
        {/* <h2>ログイン状態: {loggedInStatus}</h2>

        {loggedInStatus === "未ログイン" ?
          <HandleSuccessfulAuthentication.Provider value={handleSuccessfulAuthentication}>
            <Registration  />
            <Login />
          </HandleSuccessfulAuthentication.Provider>
        :
          <Button onClick={handleLogoutClick} 
                  variant="outlined" 
                  color="inherit"
          >
            ログアウト
          </Button>
        } */}
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            {loggedInStatus === "未ログイン" ?
              <HandleSuccessfulAuthentication.Provider value={handleSuccessfulAuthentication}>
                <Login />
                <Registration  />
              </HandleSuccessfulAuthentication.Provider>
            :
              <HandleUnsuccessfulAuthentication.Provider value={handleUnsuccessfulAuthentication}>
                <Logout />
              </HandleUnsuccessfulAuthentication.Provider>
            }
            </Grid>
          </Grid>
        </ThemeProvider>
      </>
    );
  }
  export default User;