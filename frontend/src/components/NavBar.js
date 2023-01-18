import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useMatch, useResolvedPath } from 'react-router-dom'
import Logo_resized from './Logo_resized.png'
import './navbar.css'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [token])

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
      setIsLoggedIn(false)
    }
    navigate('/login')
  }

  return (
    <nav className="nav">
      <Link to="/home" className="site-title">
        Fishbook
      </Link>
      <a className="navbar-brand" href="/home">
        <div className="logo-image">
          <CustomLink id="img-link-nav" to="/home">
            <img src={Logo_resized} alt="Site logo" className="img-fluid" />
          </CustomLink>
        </div>
      </a>
      <ul>
        {isLoggedIn ? (
          <CustomLink id="posts-link-nav" to="/posts">
            Post
          </CustomLink>
        ) : null}
        {!isLoggedIn ? (
          <CustomLink id="login-link-nav" to="/login">
            Login
          </CustomLink>
        ) : null}
        {!isLoggedIn ? (
          <CustomLink id="signup-link-nav" to="/signup">
            Signup
          </CustomLink>
        ) : null}
        {isLoggedIn ? (
          <button
            id="logout-btn-nav"
            // style={{
            //   backgroundColor: '#4d4dff',
            //   color: 'white',
            //   padding: 0,
            //   border: 'none',
            //   fontSize: '1rem',
            //   fontFamily: 'Oswald, sans-serif',
            // }}
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : null}
        {/* <CustomLink id="logout-link-nav"  to="/logout">
          Logout
        </CustomLink> */}
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  return (
    // <li className={isActive === to ? 'active' : ''}>
    <Link to={to} {...props}>
      {children}
    </Link>
    // </li>
  )
}
