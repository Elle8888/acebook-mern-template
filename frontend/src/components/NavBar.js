import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import Logo_resized from './Logo_resized.png'

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Fishbook
      </Link>
      <a className="navbar-brand" href="/">
        <div className="logo-image">
          <CustomLink id="img-link-nav" to="/">
          <img
            src={Logo_resized}
            alt="Site logo"
            className="img-fluid"
          />
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
        <CustomLink id="logout-link-nav" to="/logout">
          Logout
        </CustomLink>
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
