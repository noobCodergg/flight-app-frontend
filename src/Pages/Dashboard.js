import React,{useEffect} from 'react'
import { adminAuth } from '../Services/api';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

function Dashboard() {
    const navigate=useNavigate();
    useEffect(() => {
        const fetchAuthUser = async () => {
          try {
            // Call the authentication API
            const response = await adminAuth();
             
            console.log(response)
            // Check if the response is valid
            if (response?.status === 201) {
              // If authenticated, remain on the Home page
              
            } else {
              // If not authenticated, redirect to login
              navigate('/');
            }
          } catch (error) {
            // Handle errors, e.g., network issues or unauthorized response
            
            navigate('/');
          }
        };
    
        fetchAuthUser();
      }, [navigate]);
  return (
    <div>
      <h1>Thisis Dashboard</h1>
    </div>
  )
}

export default Dashboard
