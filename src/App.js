import React, { useEffect, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import MainLayOut from './components/MainLayOut/MainLayOut.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import jwt_decode from "jwt-decode";
import SignIn from './components/SignIn/SignIn.jsx';
import Home from './components/Home/Home.jsx';
import UpdatePassword from './components/UpdatePass/UpdatePassword.jsx';
import UpdateInfo from './components/UpdateInfo/UpdateInfo.jsx';
import ResetPass from './components/ForgetPass/ResetPass.jsx';
import SentCode from './components/ForgetPass/SentCode.jsx';




export default function App() {
  let [use, setUse] = useState()
  const router = createBrowserRouter([{
    path: "/TodoList", element: <MainLayOut logout={logout} use={use} />, children: [
      { path: "/TodoList/SignUp", element: <SignUp /> },
      { path: "/TodoList/SignIn", element: <SignIn usedata={usedata} /> },
      {
        path: "/TodoList/UpdateInfo", element:
          <ProtuctRouters><UpdateInfo use={use} /></ProtuctRouters>
      },
      { path: "/TodoList/ForgetPassword", element: <ResetPass /> },
      { path: "/TodoList/SendCode", element: <SentCode /> },
      {
        path: "/TodoList/UpdatePass", element:
          <ProtuctRouters><UpdatePassword /></ProtuctRouters>
      },
      {
        index: true, element:
          <ProtuctRouters><Home use={use} /></ProtuctRouters>
      }
    ]
  }])

  function ProtuctRouters(props) {
    if (localStorage.getItem("token")) {
      return props.children
    } else {
      return <Navigate to="/TodoList/SignIn" />
    }
  }

  function logout() {
    localStorage.removeItem("token")
    setUse(null)
    return <Navigate to="/TodoList/SignIn" />
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      usedata()
    }
  }, [])

  function usedata() {
    let token = localStorage.getItem("token")
    let decoded = jwt_decode(token)
    setUse(decoded)
  }
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}
