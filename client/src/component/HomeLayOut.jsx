import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const HomeLayOut = () => {
const {isLoggedIn} = useSelector(state => state.user)
const navigate = useNavigate()

useEffect(() => {
  if (!isLoggedIn){
    navigate("/login")
  }
}, [])

  return (
    <div>
        <Header />
        <div className='container h-screen p-6'>
        <Outlet />
        </div>
    </div>
  )
}

export default HomeLayOut