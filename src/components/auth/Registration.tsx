// useStateフックをimportする
import React, { useState, useContext} from 'react'
import axios from 'axios'
import { HandleSuccessfulAuthentication } from "./User"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Registration() {
  // useState()を用いて、ユーザーデータの初期値（空の文字列）を定義する。
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const handleSuccessfulAuthentication = useContext(HandleSuccessfulAuthentication)

  const handleSubmit = (event: any) => {
    axios.post(`http://localhost:3001/api/v1/users`,
      {
        user: {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.status === 201) {
        !!handleSuccessfulAuthentication && handleSuccessfulAuthentication(response.data)
        console.log("ユーザー登録完了", response)
      }
    }).catch(error => {
      console.log("ユーザー登録失敗", error, error.response.data.errors)
    })
    event.preventDefault()
  }

  return (
    <>
      {/* <p>新規登録</p>
      <form onSubmit={handleSubmit}> 
        <input
          type="name"
          name="name"
          placeholder="ユーザーネーム"
          value={name}
          onChange={event => setName(event.target.value)}
        />         
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="確認用パスワード"
          value={passwordConfirmation}
          onChange={event => setPasswordConfirmation(event.target.value)}
        />
        <button type="submit">登録</button>
      </form> */}
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'pink' }}>
          <ExitToAppIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="name"
            id="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            id="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Password Confirmation"
            type="password"
            id="password"
            autoComplete="current-password"
            value={passwordConfirmation}
            onChange={event => setPasswordConfirmation(event.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </>
  )
}