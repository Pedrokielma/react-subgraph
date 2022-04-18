import React from 'react'
import './Navabar.css'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className='nav'>
        <Link to={'/'}>TokenSwap</Link>
    </nav>
  )
}

export default Navbar