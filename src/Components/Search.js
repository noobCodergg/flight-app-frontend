import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';


// Reusable SelectInput Component
const SelectInput = ({ label, value, onChange, options }) => (
  <div className="flex flex-col items-center mt-4 w-full md:w-1/3">
    <label htmlFor={label} className="mb-2 text-lg font-medium text-gray-700">
      {label}
    </label>
    <select
      id={label}
      value={value}
      onChange={onChange}
      className="block w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="" disabled>
        Choose a city
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

function Search() {
  const navigate=useNavigate();
  const cities = ["Dhaka", "Rajshahi", "Barisal", "Sylhet", "Chittagong", "Khulna", "Rangpur"];
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [error,setError]=useState("");
  const handleSearch = () => {
    if(from!=="" && to!=="" && date!==""){
    navigate('/searchresult', {
      state: { from, to, date }  // Sending the state to SearchResult component
    });
  }
  else{
    setError("You haven't selected any option")
  }
  };
  return (
    <div>
      
    <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-6 p-6">
      {/* From City */}
      <SelectInput
        label="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        options={cities}
      />

      {/* To City */}
      <SelectInput
        label="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        options={cities}
      />

      {/* Date Picker */}
      <div className="flex flex-col items-center mt-4 w-full md:w-1/3">
        <label htmlFor="date" className="mb-2 text-lg font-medium text-gray-700">
          Select a Date
        </label>
        <div className="relative">
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full md:w-64 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 4h10M5 11h14M7 16h10M5 21h14"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center xl:justify-start w-full mt-12">
        <button onClick={handleSearch} className="px-6 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-950 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto ">
          Search Flights
        </button>
      </div>
    </div>
    {error && <p className='text-red-600 p-6'>{error}</p>}
    </div>
  );
}

export default Search;



