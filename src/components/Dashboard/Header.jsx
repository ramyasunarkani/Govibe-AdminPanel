import React from 'react'
import logo from '../../assets/stayfinder.png';
import './Header.css'
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  function logoutHandler(){
    dispatch(authActions.logout());
  }
  return (
    <header className='header'>
        <div className='logo' onClick={()=>navigate('/dashboard')}>
            <img src={logo} width={50} height={50}/>
            <p>GoVibe</p>
        </div>
        <button type='button' onClick={logoutHandler}>LogOut</button>
    </header>
  )
}

export default Header