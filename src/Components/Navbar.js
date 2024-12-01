// src/Components/Navbar.js
import { useState,useEffect } from 'react';
// Import the AuthContext
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../Media/logo.png';
import DropdownMenu from './DropDownMenu';
import { authUser } from '../Services/api';
import Search from './Search';

function Navbar() {
  const navigate=useNavigate()
  useEffect(()=>{
    const fetchUser= async()=>{
        try{
        const response=await authUser();
        console.log(response.status)
        if(response.status!==200){
            
        }
        }catch(error){
          localStorage.removeItem('id')
          localStorage.removeItem('isLoggedIn')
         
        }
    }

    fetchUser();
  },[])
  // Access isLoggedIn from the context
  const login=localStorage.getItem('isLoggedIn')
  const [isOpen,setIsOpen]=useState(false)

  const handleOpen=()=>{
    setIsOpen(!isOpen)
  }
  return (
    <div>
    <div className='flex items-center justify-between md:justify-between h-32 pr-10 md:pr-32 shadow-xl'>
      <div className='flex items-center justify-center'>
        <Link to= '/'><img src={logo} alt='logo' className='h-32' /></Link>
        <h1 className='text-2xl font-bold text-teal-900'>GoZayan</h1>
      </div>
      <Link to='/allflights'>All Flights</Link> 
      <p onMouseOver={handleOpen} className='cursor-pointer'>Search Flight</p>
     
      {!login ? <Link to='/login'>Log In</Link> : <DropdownMenu/>}
    </div>
    {
      isOpen && <Search/>
    }
    <Outlet/>
    </div>
  );
}

export default Navbar;

