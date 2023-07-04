import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar.jsx'

export default function MainLayOut({logout,use}) {
  return (
    <div>
      <NavBar logout={logout} use={use} />
      <Outlet />
    </div>
  )
}
