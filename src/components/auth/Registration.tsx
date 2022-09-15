// useStateフックをimportする
import React, { useState, useContext} from 'react'
import axios from 'axios'
import { HandleSuccessfulAuthentication } from "./User"

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
    <div>
      <p>新規登録</p>
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
      </form>
    </div>
  )
}