import React, { useContext } from "react";
import { LoggedInStatus } from '../../App'

export default function Dashboard() {

  const loggedInStatus = useContext(LoggedInStatus)

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>ログイン状態: {loggedInStatus}</h2>
    </div>
  )
}