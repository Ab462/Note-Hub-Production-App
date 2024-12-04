import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import NoteState from "../context/NoteState";
import Alert from "../components/Alert";
import './Root.css'

export default function Root() {
  const [alert, setAlert] = useState({ type: '', msg: '' });
  const [name, setName] = useState('');

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  const getName = () => {
    const url = `${process.env.REACT_APP_BASE_API_URL}/auth/getuser`
    const Token = localStorage.getItem('Token');
    fetch(url, {
      method: "POST",
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': Token
      },
    }).then((res) => res.json()).then((data) => setName(data.name)).catch((error) => console.log(error));
  }
  
  getName();

  return (
    <>
      <NoteState showAlert={showAlert} >
        <Navbar name={name} />
        <Alert alert={alert} />
        <div className="container">
          <Outlet context={[showAlert, name]} />
        </div>
      </NoteState>
    </>
  );
}



