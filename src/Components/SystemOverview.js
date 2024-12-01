import React from 'react';
import image1 from '../Media/se.jpg'
import image2 from '../Media/book.jpg'
import image3 from '../Media/user.jpg'

const SystemOverview = () => {
  
  return (
    <div>

    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Flight Booking App: System Overview
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">
          A seamless and secure platform to help users search, select, and book flights easily.
        </p>
      </div>

      {/* Feature Section 1 */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
        <div className="relative rounded-lg overflow-hidden shadow-xl">
          <img src={image1} alt="Flight Search" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
            <div>
              <h3 className="text-3xl font-semibold">Flight Search Engine</h3>
              <p className="mt-4 text-lg">Search flights based on departure, destination, and date. Apply filters to refine results.</p>
            </div>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-xl">
          <img src={image2} alt="Booking Flow" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
            <div>
              <h3 className="text-3xl font-semibold">Flight Selection & Booking</h3>
              <p className="mt-4 text-lg">Choose your preferred flight, select seats, and proceed with secure booking.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section 2 */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <img src={image3} alt="User Profile" className="mx-auto mb-6 rounded-full w-32 h-32 object-cover" />
          <h3 className="text-2xl font-semibold text-gray-800">User Profiles</h3>
          <p className="mt-4 text-gray-600">Save personal details, track bookings, and manage travel preferences.</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <img src="https://via.placeholder.com/150" alt="Payment Integration" className="mx-auto mb-6 rounded-full w-32 h-32 object-cover" />
          <h3 className="text-2xl font-semibold text-gray-800">Payment Gateway</h3>
          <p className="mt-4 text-gray-600">Secure transactions via credit cards, debit cards, and digital wallets.</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <img src="https://via.placeholder.com/150" alt="Notifications" className="mx-auto mb-6 rounded-full w-32 h-32 object-cover" />
          <h3 className="text-2xl font-semibold text-gray-800">Notifications & Alerts</h3>
          <p className="mt-4 text-gray-600">Stay updated with booking confirmations, flight status changes, and trip reminders.</p>
        </div>
      </div>

      {/* Feature Section 3 */}
      <div className="mt-16 bg-gradient-to-r from-blue-500 to-green-500 text-white p-16 rounded-lg shadow-xl">
        <h3 className="text-3xl font-semibold">Admin Dashboard</h3>
        <p className="mt-4 text-lg">Manage flight schedules, pricing, customer data, and generate reports with an easy-to-use interface.</p>
      </div>

      {/* Technology Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Technologies & Architecture</h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">Built with modern technologies like React, Node.js, and integrated with third-party APIs for flight data and payments.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
        {/* Technology 1 */}
        <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-lg">
          <img src="https://via.placeholder.com/150" alt="Frontend" className="w-24 h-24 mr-4 rounded-full object-cover" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Frontend</h3>
            <p className="mt-4 text-gray-600">Built with React.js, ensuring a responsive, interactive, and modern interface for all users.</p>
          </div>
        </div>

        {/* Technology 2 */}
        <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-lg">
          <img src="https://via.placeholder.com/150" alt="Backend" className="w-24 h-24 mr-4 rounded-full object-cover" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Backend</h3>
            <p className="mt-4 text-gray-600">Node.js with Express for a scalable and robust backend to handle real-time flight information and bookings.</p>
          </div>
        </div>
      </div>

      {/* Benefit Section */}
      <div className="mt-16 text-center bg-blue-100 p-16 rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-gray-800">Benefits to Users</h3>
        <p className="mt-4 text-lg text-gray-600">A quick, secure, and efficient way to plan trips and book flights with personalized options and real-time information.</p>
      </div>
    </div>
    </div>
  );
};

export default SystemOverview;
