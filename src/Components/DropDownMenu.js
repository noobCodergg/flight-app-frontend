import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../Services/api';

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle logout functionality
  const handleLogOut = async () => {
    try {
      await logOut();
      localStorage.removeItem('id');
      localStorage.removeItem('isLoggedIn');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
      navigate('/500')
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Trigger Button */}
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center justify-between w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span>Account</span>
        <svg
          className="ml-2 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link
              to="/myprofile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </Link>
            <Link
              to="/mybookings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Bookings
            </Link>
            <p
              onClick={handleLogOut}
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              Log Out
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;

