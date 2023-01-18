import React from 'react'
import { useNavigate, Link, useMatch, useResolvedPath } from 'react-router-dom'
import Logo_resized from './Logo_resized.png'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
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
        <CustomLink id="posts-link-nav" to="/posts">
          Post
        </CustomLink>
        <CustomLink id="login-link-nav" to="/login">
          Login
        </CustomLink>
        <CustomLink id="signup-link-nav" to="/signup">
          Signup
        </CustomLink>
        <button id="logout-btn-nav" onClick={handleLogout}>
          Logout
        </button>
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
