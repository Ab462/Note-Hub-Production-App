import React, { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

export default function SignUp() {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
  const [showAlert] = useOutletContext();
  const navigate = useNavigate();
  const onChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setCredentials((prevCred) => ({
      ...prevCred,
      [name]: value,
    }));

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const url = `${process.env.REACT_APP_BASE_API_URL}/auth/Signup`
    const response = await fetch(url, {
      method: "POST",
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    })
    const data = await response.json();
    if (data.success) {
      // redirect user 
      localStorage.setItem('Token', data.Token)
      showAlert(data.message, 'success')
      navigate('/')

    } else {
      showAlert(data.error, 'danger')
    }
    setCredentials({ name: '', email: '', password: '' });
  }
  return (
    <div className='container'>
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit} className='my-4'>
        <div className="mb-3">
          <label htmlFor="exampleInputText1" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' onChange={onChange} value={credentials.name} id="exampleInputText1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" name='email' onChange={onChange} value={credentials.email} id="exampleInputEmail1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' onChange={onChange} value={credentials.password} id="exampleInputPassword1" />
        </div>
        <div>
          <Link to='/login' style={{ color: 'black', textDecoration: 'none' }}>Already have an account? Log in here to access your notes</Link>
        </div>
        <button type="submit" className="btn btn-outline-primary my-2 col-1">Sign Up</button>
      </form>
    </div>
    // 
  )
}
