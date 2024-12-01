import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { adminAuth } from "../Services/api";
import { postFlight } from "../Services/fligth";
function CreateFlight() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    flight_number: "",
    airline: "",
    origin: "",
    destination: "",
    date: "",
    time: "",
    price: "",
    seats: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postFlight(formData)
      console.log("Flight created successfully:", response.data);
      alert("Flight created successfully!");
      setFormData({
        flight_number: "",
        airline: "",
        origin: "",
        destination: "",
        date: "",
        time: "",
        price: "",
        seats: "",
      });
    } catch (error) {
      console.error("Error creating flight:", error);
      navigate('/error404')
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-2xl"
      >
        <h2 className="mb-6 text-3xl font-bold text-gray-800 text-center">
          Add Flight Details
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Fill in the details below to add a flight to the system.
        </p>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: "Flight Number", name: "flight_number", type: "text" },
            { label: "Airline", name: "airline", type: "text" },
            { label: "Origin", name: "origin", type: "text" },
            { label: "Destination", name: "destination", type: "text" },
            { label: "Date", name: "date", type: "date" },
            { label: "Time", name: "time", type: "time" },
            { label: "Price", name: "price", type: "number" },
            { label: "Seats", name: "seats", type: "number" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="mb-2 text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 text-lg font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            Submit Flight
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateFlight;


