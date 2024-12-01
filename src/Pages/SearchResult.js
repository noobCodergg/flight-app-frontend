import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { searchFLight } from '../Services/fligth';
import Navbar from '../Components/Navbar';

function SearchResult() {
  const navigate=useNavigate()
  const location = useLocation();
  const { from, to, date } = location.state || {};
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('default'); // Track the sorting order
  const [seatFilter, setSeatFilter] = useState(0); // Filter flights with seats >= this value
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await searchFLight(from, to, date);
        const now = new Date();

        // Filter flights based on date and time
        const filteredFlights = response.data.filter((flight) => {
          const flightDateTime = new Date(`${flight.date}T${flight.time}`);
          return flightDateTime >= now;
        });

        setData(filteredFlights);
      } catch (error) {
        navigate()
      }
    };

    fetchFlight();
  }, [from, to, date]);

  // Apply sorting based on the selected sortOrder
  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return parseFloat(a.price) - parseFloat(b.price);
    }
    if (sortOrder === 'highToLow') {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    return 0; // Default order
  });

  // Apply seat filtering
  const filteredData = sortedData.filter((flight) => flight.seats >= seatFilter);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-extrabold text-teal-900 text-center mb-12">
          Search Results
        </h1>

        {/* Sorting and Filtering */}
        <div className="flex justify-center mb-6 gap-4">
          {/* Sorting Dropdown */}
          <select
            className="p-2 border rounded-md shadow"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>

          {/* Seats Filter */}
          <select
            className="p-2 border rounded-md shadow"
            value={seatFilter}
            onChange={(e) => setSeatFilter(Number(e.target.value))}
          >
            <option value="0">All Seats</option>
            <option value="10">10+ Seats</option>
            <option value="20">20+ Seats</option>
            <option value="30">30+ Seats</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentData.length > 0 ? (
            currentData.map((flight) => (
              <Link to={`/flights/${flight._id}`} key={flight._id}>
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
                    <strong>Price:</strong> ${flight.price}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Seats:</strong> {flight.seats}
                  </p>
                  <button className="w-full py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300">
                    View Flight Detail
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-700 text-lg col-span-full">
              No flights available for the selected filters.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredData.length > itemsPerPage && (
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
    </div>
  );
}

export default SearchResult;
