import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [showAlert] = useOutletContext();
  let navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setUser((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BASE_API_URL}/auth/login`
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email, password: user.password })
    })
    const data = await response.json();
    if (data.success) {
      //save the auth token and redirect user 
      localStorage.setItem('Token', data.Token);
      showAlert(data.message, 'success')
      navigate('/')

    } else {
      showAlert(data.error, 'danger')
    }
  }
  return (
    <div>
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit} className='my-4'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" value={user.email} onChange={onChange} name='email' id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={user.password} onChange={onChange} name='password' id="exampleInputPassword1" />
        </div>
        <div>
          <Link to='/signup' style={{ color: 'black', textDecoration: 'none' }}>Don't have an account yet? Sign up to get started!</Link>
        </div>
        <button type="submit" className="btn btn-outline-primary my-2 col-1" >Login</button>
      </form>
    </div>
  )
}
