import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import DashBoard from './components/Dashboard/DashBoard';
import { useDispatch, useSelector } from 'react-redux';
import AdminListingPanel from './components/Dashboard/AdminListingPanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef } from 'react';
import { fetchListData } from './Store/listing_actions';
import { fetchCategoriesData } from './Store/category_actions';
import AdminCategoryPanel from './components/Dashboard/AdminCategoryPanel';
import AdminBookings from './components/Dashboard/AdminBookings';
import { fetchAllBookings } from './Store/bookings_actions';

function App() {
  const userLogged = useSelector((state) => state.auth.userLogged);
  const dispatch=useDispatch();
  const isInitial = useRef(true);
    const listItems=useSelector(state=>state.listItems);


  useEffect(()=>{
  dispatch(fetchListData());
  dispatch(fetchCategoriesData())
  dispatch(fetchAllBookings())
},[dispatch])
 
  return (
    <>
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
      <Route path='/' element={<Navigate to='/login'/>}/>
      <Route path='/login' element={userLogged ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path='/dashboard' element={userLogged ? <DashBoard /> : <Navigate to="/login" />} >
        <Route path='categories' element={<AdminCategoryPanel/>}/>
        <Route path='listings' element={<AdminListingPanel/>}/>
        <Route path="admin/bookings" element={<AdminBookings/>} />

      </Route>
    </Routes>
    </>
  );
}

export default App;
