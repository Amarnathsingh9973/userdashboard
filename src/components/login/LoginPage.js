import React, { useEffect } from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Firebase';
import style from "./loginpage.module.css";
import Card from '../ui/Card';
import Dashboard from "../dashboard/Dashboard";
// import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [error, setError] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  let navigate = useNavigate();

  let emailData = (e) => {
    setEmail(e.target.value);
  };
  let passwordData = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (loggedIn) {
      return <Dashboard uid="{userId} " />;
    }
  }, [loggedIn, userId]);

  function submitHandler(event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        var userId = user.uid;
        setLoggedIn(true);
        setUserId(userId);
        navigate("/dashboard", { state: { userId: userId } });
        setError(false)
      })
      .catch((error) => {
        setError(true)
      });
  }
  return (
    <Card>
      <form className={style.form} onSubmit={submitHandler}>
        <h1>Login</h1>
        <div className={style.control}>
          <label htmlFor="title">Email</label>
          <input type="email" required id="email" onChange={emailData} />
        </div>
        <div className={style.control}>
          <label htmlFor="title">Password</label>
          <input type="password" required id="password" onChange={passwordData} />
        </div>
        <div className={style.actions}>
          <button>Login</button>
        </div>
        {error && <span>Wrong email or password!</span>}
      </form>
    </Card>
  )
}
