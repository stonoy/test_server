import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex p-4 justify-end items center gap-4 border-b-2 border-slate-700'>
        <Link to="/">Home</Link>
        <Link to="/connection">Connection</Link>
    </div>
  )
}

export default Header