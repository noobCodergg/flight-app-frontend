import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Services/api'; // Ensure this is correctly defined in your API services

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User',
    phone: '',
  });

  const [errors, setErrors] = useState(null); // Initialize as null to handle dynamic errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrors('Passwords do not match');
      return;
    }

    try {
      // Call the API to register the user
      const response = await registerUser(formData);

      // On success, navigate to the account creation page
      navigate('/login');
    } catch (error) {
      // Handle server-side errors
      if (error.response && error.response.status === 500) {
        // Redirect to Error500 page
        navigate("/500");
      } 
      else if (error.response && error.response.data) {
        setErrors(error.response.data.error || 'Something went wrong');
      } else {
        setErrors('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="p-8 md:w-1/2 w-full h-full bg-teal-950">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border bg-teal-900 border-gray-300 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white"
          />
        </div>

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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border bg-teal-900 border-gray-300 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white"
          />
        </div>

        

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border bg-teal-900 border-gray-300 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white"
          />
        </div>

        {errors && (
          <div className="text-red-500 text-sm">{errors}</div>
        )}

        <button
          type="submit"
          className="w-full mt-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create
        </button>
      </form>

      <div className="text-white mt-2">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-blue-300">
            Log in here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
