import React from 'react';
import './SideBar.css';
import { NavLink } from 'react-router-dom';
import { BiListPlus } from "react-icons/bi";
import { BiAddToQueue } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";

const SideBar = () => {
  return (
    <div className='sidebar'>
      <NavLink to="categories" className='nav-link'>
      <span>
        <BiListPlus size={30}/>
      </span>
        Categories
      </NavLink>
      <NavLink to="listings" className='nav-link'>
      <span>
        <BiAddToQueue size={30}/>
      </span>
        Listings
      </NavLink>
      <NavLink to='admin/bookings' className='nav-link'>
        <span>
          <IoMdHome size={30}/>
        </span>
        Bookings
      </NavLink>

    </div>
  );
};

export default SideBar;
