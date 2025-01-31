import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { customFetch } from '../utils'
import { useDispatch } from 'react-redux'
import { logout } from '../feature/user/userSlice'
import { toast } from 'react-toastify'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async() => {
    try {
      await customFetch.get("/user/logout")
      dispatch(logout())
      navigate("/login")
      toast.success("user logged out")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }
  return (
    <div className='flex p-4 justify-end items center gap-4 border-b-2 border-slate-700'>
        <Link to="/">Home</Link>
        <Link to="/connection">Connection</Link>
        <button onClick={handleLogout} className='p-2 bg-slate-500 text-white'>logout</button>
    </div>
  )
}

export default Header