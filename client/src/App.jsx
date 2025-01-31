import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomeLayOut from './component/HomeLayOut'
import Login from './component/Login'
import Register from './component/Register'
import Landing from './component/Landing'
import Connections from './component/Connections'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: "connection",
        element: <Connections />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App