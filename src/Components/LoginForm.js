import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logInUser } from '../Services/api';
import { UserContext } from '../Context/UserContext';
const LoginForm = () => {
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error,setError]=useState(null);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response=await logInUser(formData)
      console.log(response.data)
      if(response.status===200){
        localStorage.setItem('isLoggedIn',true)
        await setUser(response.data)
        navigate('/')
      }

      else if(response.status===201){
        localStorage.setItem('isLoggedIn',true)
        await setUser(response.data)
        navigate('/dashboard')
      }

      else{

      }
    }catch(error){
      
     if (error.response && error.response.data) {
        setError(error.response.data.message)
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  return (
    
      <div className="p-8  md:w-1/2 w-full h-full bg-teal-950">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Log In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border bg-teal-900 border-gray-300 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>

         

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border bg-teal-900 border-gray-300 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>

        {
          error && <p className='text-red-600'>{error}</p>
        }

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log in
          </button>
        </form>

        <div className='text-white mt-2'>
            <p>Need an account? <Link to='/registration' className='text-blue-300'>Create account here!</Link></p>
        </div>
      </div>
  );
};

export default LoginForm;
