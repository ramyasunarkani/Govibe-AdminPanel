import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardStatsCard from './DashboardStatsCard';
import { useSelector } from 'react-redux';
import './Dashboard.css'

const DashBoard = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname === '/dashboard';
    const categories = useSelector((state) => state.categories.categories);
  const listings = useSelector((state) => state.listItems.items);
  const bookings = useSelector((state) => state.bookings.bookings);
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <SideBar />
       
        <main style={{ marginLeft: '180px', marginTop: '80px', padding: '1rem', flex: 1 }}>
        {isDashboardRoute && <div className="dashboard-stats-container">
        <DashboardStatsCard title="Total Categories" count={categories.length} color="#f39c12" path='/dashboard/categories'/>
        <DashboardStatsCard title="Total Listings" count={listings.length} color="#27ae60" path='/dashboard/listings'/>
        <DashboardStatsCard title="Total Bookings" count={bookings.length} color="#2980b9" path='/dashboard/admin/bookings'/>
          
        </div>}
          <Outlet /> 
        </main>
      </div>
    </>
  );
};

export default DashBoard;
