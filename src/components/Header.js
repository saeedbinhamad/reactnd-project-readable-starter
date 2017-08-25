import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <div className="readable-header">
    <div className="container ">
      <nav className="navbar ">
        <div className="navbar-brand">

          <Link className="navbar-item" to="/">
           Go to Home
          </Link>
          
        </div>
      </nav>
    </div>
  </div>
)

export default Header
