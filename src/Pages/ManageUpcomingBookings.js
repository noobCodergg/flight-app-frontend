import React, { useEffect, useState } from "react";
import { allBooking, updateBooking, deleteBooking } from "../Services/user"; // Import API functions
import Navbar from "../Components/Navbar";

function ManageUpcomingBookings() {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await allBooking(); // Fetch all bookings
      const now = new Date();
      const upcomingBookings = response.data.filter((booking) => {
        const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
        return bookingDateTime >= now;
      });

      setBookings(upcomingBookings);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdate = async (book) => {
    try {
      // Fetch all bookings to validate seat numbers
      const response = await allBooking();
      const allBookedSeats = response.data
        .filter((b) => b._id !== book._id) // Exclude the current booking being edited
        .flatMap((b) => b.bookedSeats); // Combine all booked seats into a single array

      // Check if any of the new seats are already booked
      const seatConflict = book.bookedSeats.some((seat) =>
        allBookedSeats.includes(seat)
      );

      if (seatConflict) {
        alert(
          "One or more of the selected seats are already booked. Please choose different seats."
        );
        return;
      }

      // Proceed with updating the booking if seats are valid
      const updatedBooking = await updateBooking(book._id, book); // API to update booking
      alert("Booking updated successfully!");
      setEditingBooking(null);
      fetchBookings(); // Re-fetch bookings to re-render the component
    } catch (err) {
      console.error("Error updating booking:", err);
      alert("Failed to update booking. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id); // API to delete booking
      alert("Booking deleted successfully!");
      fetchBookings(); // Re-fetch bookings to re-render the component
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking. Please try again.");
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-8 mt-10">
        <h1 className="text-3xl font-bold text-teal-900 text-center mb-8">
          Manage Upcoming Bookings
        </h1>
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-600">{error}</p>
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow"
              >
                {editingBooking && editingBooking._id === book._id ? (
                  <div>
                    {[
                      "name",
                      "email",
                      "phone",
                      "address",
                      "flight_number",
                      "from",
                      "to",
                      "date",
                      "time",
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
                          value={editingBooking[field] || ""}
                          onChange={(e) =>
                            setEditingBooking((prev) => ({
                              ...prev,
                              [field]: e.target.value,
                            }))
                          }
                          className="block w-full p-2 border border-gray-300 rounded mt-1"
                        />
                      </label>
                    ))}
                    <label className="block mb-2">
                      Booked Seats:
                      <input
                        type="text"
                        value={editingBooking.bookedSeats.join(", ")}
                        onChange={(e) =>
                          setEditingBooking((prev) => ({
                            ...prev,
                            bookedSeats: e.target.value
                              .split(",")
                              .map((seat) => parseInt(seat.trim())),
                          }))
                        }
                        className="block w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </label>
                    <button
                      onClick={() => handleUpdate(editingBooking)}
                      className="w-full py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors mt-2"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 mb-2">
                      <strong>Name:</strong> {book.name}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Email:</strong> {book.email}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Phone:</strong> {book.phone}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Address:</strong> {book.address}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Flight Number:</strong> {book.flight_number}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>From:</strong> {book.from}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>To:</strong> {book.to}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Date:</strong>{" "}
                      {new Date(book.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Time:</strong> {book.time}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Booked Seats:</strong>{" "}
                      {book.bookedSeats.join(", ")}
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setEditingBooking(book)}
                        className="py-2 px-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="py-2 px-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">
            No upcoming bookings available.
          </p>
        )}
      </div>
    </div>
  );
}

export default ManageUpcomingBookings;
