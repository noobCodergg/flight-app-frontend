import React, { useEffect, useState } from "react";
import { allFLight, updateFlight, deleteFlight, getBooking } from "../Services/fligth"; 
import { removeBooking, updatebookingdetail } from "../Services/user";
import { useNavigate } from "react-router-dom";

function ManageFlights() {
  const navigate=useNavigate()
  const [flights, setFlights] = useState([]);
  const [editingFlight, setEditingFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlights = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await allFLight();
      const now = new Date();
      const upcomingFlights = response.data.filter((flight) => {
        const flightDateTime = new Date(`${flight.date}T${flight.time}`);
        return flightDateTime >= now;
      });
      setFlights(upcomingFlights);
    } catch (err) {
      navigate()
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleUpdate = async (flight) => {
    const response = await getBooking(flight._id);
    try {
      setFlights((prev) =>
        prev.map((f) => (f._id === flight._id ? { ...f, ...flight } : f))
      );
      await updateFlight(flight._id, flight);
      if(response.data.length!=0){
      updatebookingdetail(flight._id, flight.date, flight.time);
      }
      alert("Flight updated successfully!");
      setEditingFlight(null);
    } catch (err) {

      console.error("Error updating flight:", err);
      alert("Failed to update flight. Please try again.");
      fetchFlights(); // Revert changes
    }


    try{
      await updatebookingdetail(flight._id, flight.date, flight.time);
    }catch(error){
      alert(error)
    }
  
  };

  const handleDelete = async (id) => {
    const response = await getBooking(id);
    try {
      setFlights((prev) => prev.filter((flight) => flight._id !== id));
      const data=id;
   
      if(response.data.length!=0){
      await removeBooking(data);
      }
      await deleteFlight(id);
      alert("Flight deleted successfully!");
    } catch (err) {
      console.error("Error deleting flight:", err);
      alert("Failed to delete flight. Please try again.");
      fetchFlights(); // Revert changes
    }
   
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-10">
      <h1 className="text-3xl font-bold text-teal-900 text-center mb-8">
        Manage Upcoming Flights
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-600">{error}</p>
      ) : flights.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {flights.map((flight) =>
            editingFlight && editingFlight._id === flight._id ? (
              <FlightEditForm
                key={flight._id}
                flight={editingFlight}
                setFlight={setEditingFlight}
                onSave={handleUpdate}
              />
            ) : (
              <FlightCard
                key={flight._id}
                flight={flight}
                onEdit={setEditingFlight}
                onDelete={handleDelete}
              />
            )
          )}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">
          No upcoming flights available.
        </p>
      )}
    </div>
  );
}

const FlightCard = ({ flight, onEdit, onDelete }) => (
  <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
    <p className="text-gray-700 mb-2">
      <strong>Flight Number:</strong> {flight.flight_number}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Airline:</strong> {flight.airline}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Origin:</strong> {flight.origin}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Destination:</strong> {flight.destination}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Date:</strong> {new Date(flight.date).toLocaleDateString()}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Time:</strong> {flight.time}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Price:</strong> {flight.price}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Seats Available:</strong> {flight.seats}
    </p>
    <div className="flex justify-between mt-4">
      <button
        onClick={() => onEdit(flight)}
        className="py-2 px-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(flight._id)}
        className="py-2 px-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
);

const FlightEditForm = ({ flight, setFlight, onSave }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    {[
      "flight_number",
      "airline",
      "origin",
      "destination",
      "date",
      "time",
      "price",
      "seats",
    ].map((field) => (
      <label key={field} className="block mb-2">
        {field.charAt(0).toUpperCase() + field.slice(1)}:
        <input
          type={
            field === "date"
              ? "date"
              : field === "time"
              ? "time"
              : "text"
          }
          value={flight[field] || ""}
          onChange={(e) =>
            setFlight((prev) => ({ ...prev, [field]: e.target.value }))
          }
          className="block w-full p-2 border border-gray-300 rounded mt-1"
        />
      </label>
    ))}
    <button
      onClick={() => onSave(flight)}
      className="w-full py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors mt-2"
    >
      Save Changes
    </button>
  </div>
);

export default ManageFlights;
