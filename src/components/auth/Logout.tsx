import React, { useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../App'
import { HandleUnsuccessfulAuthentication } from "./User"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';

export default function Logout() {
  const handleUnsuccessfulAuthentication = useContext(HandleUnsuccessfulAuthentication)
  const user = useContext(UserContext)

  // const handleSubmit = () => {
  //   axios.delete(`http://localhost:3001/api/v1/sessions/${{user_id: user?.id}}`, { withCredentials: true }
  //     ).then(response => {
  //       !!handleUnsuccessfulAuthentication && handleUnsuccessfulAuthentication()
  //       console.log("ログアウト", response)
  //     }).catch(error => console.log("ログアウトエラー", error))
  // }
  const handleSubmit = () => {
    axios.delete(`${process.env.REACT_APP_BACK_ORIGIN}/api/v1/sessions/${{user_id: user?.id}}`, { withCredentials: true }
      ).then(response => {
        !!handleUnsuccessfulAuthentication && handleUnsuccessfulAuthentication()
        console.log("ログアウト", response)
      }).catch(error => console.log("ログアウトエラー", error))
  }

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LogoutIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign out
        </Typography>
        <Box component="form" noValidate  sx={{ mt: 1 }}>
          <Button
            onClick={handleSubmit}
            // type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign out
          </Button>
          {/* <Button onClick={handleSubmit} 
                      variant="outlined" 
                      color="inherit"
          >
            ログアウト
          </Button> */}
        </Box>
      </Box>
    </>
  )
}