import React, { useContext, useEffect, useState } from 'react';
import { allFLight } from '../Services/fligth';
import { Link, useNavigate } from 'react-router-dom';
import { FlightContext } from '../Context/FlightContext';
function AllFlights() {
  const navigate=useNavigate()
  const {setFlight}=useContext(FlightContext)
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 2; // Flights per page

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await allFLight();
        const now = new Date();

        const filteredFlights = response.data.filter((flight) => {
          // Combine date and time into a single Date object
          const flightDateTime = new Date(`${flight.date}T${flight.time}`);
          return flightDateTime >= now;
        });

        setData(filteredFlights);
        setFlight(filteredFlights)
      } catch (error) {
        navigate('/error404')
      }
    };

    fetchFlightData();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-teal-900 text-center mb-12">
        Explore Available Flights
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentData.length > 0 ? (
          currentData.map((flight, index) => (
            <Link to={`/flights/${flight._id}`} key={index}>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-cyan-400 opacity-10"></div>
                <h2 className="text-xl font-bold text-blue-600 mb-2">
                  {flight.flight_number} - {flight.airline}
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>From:</strong> {flight.origin}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>To:</strong> {flight.destination}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Date:</strong> {new Date(flight.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Time:</strong> {flight.time}
                </p>
                <button className="w-full py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300">
                  View Flight Detail
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-700 text-lg col-span-full">
            No flights available at the moment.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {data.length > itemsPerPage && (
        <div className="flex justify-center mt-8">
          <button
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-500 text-white'
            }`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-500 text-white'
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AllFlights;

