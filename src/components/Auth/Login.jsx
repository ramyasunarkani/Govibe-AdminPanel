import React, { useRef, useState } from 'react';
import { RiEyeCloseLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import './Login.css';
import stayPng from '../../assets/stayfinder.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (!enteredEmail || !enteredPassword) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvgdmwulpxL47k4OoiPinzGUINuoBbjec',
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }
      );

      dispatch(authActions.login(res.data.idToken)); 
      emailRef.current.value = '';
      passwordRef.current.value = '';
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        alert(`Login Failed: ${error.response.data.error.message}`);
      } else {
        alert(`An unexpected error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-container">
      <div className='image'>
        <img src={stayPng} alt='Stay icon' width={110} height={110} />
        <p>Admin Panel</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          ref={emailRef}
          required
        />
        <div className="password-field">
          <input
            type={show ? 'text' : 'password'}
            placeholder="Enter Password"
            ref={passwordRef}
            required
          />
          <span onClick={() => setShow(!show)} className="eye-icon">
            {show ? <BsEye /> : <RiEyeCloseLine />}
          </span>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
