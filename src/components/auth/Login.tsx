import React, { useState, useContext} from 'react'
import axios from 'axios'
import { HandleSuccessfulAuthentication } from "../pages/User"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSuccessfulAuthentication = useContext(HandleSuccessfulAuthentication)

  const handleSubmit = (event: any) => {
    axios.post("http://localhost:3001/api/v1/sessions",
      {
        user: {
          email: email,
          password: password
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        !!handleSuccessfulAuthentication && handleSuccessfulAuthentication(response.data)
        console.log("ログイン成功")
      }
      console.log("login response: ", response)
    }).catch(error => {
      console.log("registration error", error)
    })
    event.preventDefault()
  }

  return (
    <div>
      <p>ログイン</p>
      <form onSubmit={handleSubmit}>       
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
        <button type="submit">ログイン</button>
      </form>
    </div>
  )
}