import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(props) {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('Token'));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('Token'));
  }, [location.pathname]); 


  const handleLogout = () => {
    localStorage.removeItem('Token');
    setIsLoggedIn(false)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NoteHub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className={'nav-item'}>
              {isLoggedIn ? <Link className={`nav-link ${location.pathname === '/welcome' ? 'active' : ''}`} to="/welcome">Welcome</Link> : (
                <span className="nav-link disabled">Welcome</span>
              )}
            </li>
          </ul>
          {!localStorage.getItem('Token') ? <form className="d-flex">
            <Link className="btn btn-outline-primary mx-2 text-white" to="/login" role="button">Login</Link>
            <Link className="btn btn-outline-primary mx-2 text-white" to="/signup" role="button">Sign Up</Link>
          </form> :
            <div className="dropdown" >
              <Link className="btn btn-outline-primary d-flex justify-content-evenly align-items-center  dropdown-toggle text-white" style={{ width:'96px'}} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.name?props.name.charAt(0).toUpperCase() + props.name.slice(1,8):'User'}
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to='/login' onClick={handleLogout}>SignOut</Link></li>
                <li><Link className="dropdown-item" to='/welcome'>Account</Link></li>
              </ul>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}
