import React, { useContext } from "react";
import { LoggedInStatus } from '../Main'

export default function Dashboard() {

  const status = useContext(LoggedInStatus)

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>ログイン状態: {status}</h2>
    </div>
  )
}