import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../Media/logo.png';
import { adminAuth, logOut } from '../Services/api';

function AdminNav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Verify admin authentication
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await adminAuth();
        if (response.status !== 201) {
          navigate('/');
        }
      } catch(error) {
       navigate('/')
      }
    };

    verifyAdmin();
  }, [navigate]);

  // Handle logout action
  const handleLogOut = async () => {
    try {
      await logOut();
      setIsLoggedIn(null);
      localStorage.removeItem('isLoggedIn')
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
      alert('Logout failed. Please try again.');
    }
  };

  // Navigation links configuration
  const navLinks = [
    { to: '/dashboard/createflight', label: 'Create Flight' },
    { to: '/dashboard/manageflight', label: 'Manage Flights' },
    { to: '/dashboard/managebooking', label: 'Manage Bookings' },
  ];

  return (
    <div>
      <header className="flex items-center justify-between h-32 px-10 md:px-32 shadow-xl">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/dashboard">
            <img src={logo} alt="logo" className="h-32" />
          </Link>
          <h1 className="text-2xl font-bold text-teal-900 ml-4">GoZayan</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-teal-800 hover:text-teal-600">
              {link.label}
            </Link>
          ))}
          {!isLoggedIn ? (
            <Link to="/login" className="text-teal-800 hover:text-teal-600">
              Log In
            </Link>
          ) : (
            <p
              onClick={handleLogOut}
              className="cursor-pointer text-teal-800 hover:text-teal-600"
            >
              Log Out
            </p>
          )}
        </nav>
      </header>

      {/* Render child components */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminNav;

