import React, { useEffect, useState, useCallback, useContext } from "react";
import { deleteBooking, getUserBookings } from "../Services/user";
import Navbar from "../Components/Navbar";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate=useNavigate()
  const {user}=useContext(UserContext)
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState(null);
  
  const userId = user.id;

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getUserBookings(userId);

        // Filter bookings to include only those from now onwards
        const now = new Date();
        const upcomingBookings = response.data.filter((booking) => {
          const bookingDateTime = new Date(`${booking.date}T${booking.time}:00`);
          return bookingDateTime >= now;
        });

        setBookings(upcomingBookings);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
        navigate('/404')
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchBookings();
  }, [userId,deleting]);

  const handleDelete = useCallback(
    async (bookingId) => {
      setDeleting(bookingId);

      try {
        await deleteBooking(bookingId);
        setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
      } catch (err) {
        console.error("Error deleting booking:", err);
        alert("Failed to delete booking. Please try again.");
      } finally {
        setDeleting(null);
      }
    },
    []
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8 mt-10">
        <h1 className="text-3xl font-bold text-teal-900 text-center mb-8">
          My Upcoming Bookings
        </h1>

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-600">{error}</p>
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => {
              const bookingDateTime = new Date(
                `${booking.date}T${booking.time}:00`
              );
              const now = new Date();
              const disableButton =
                bookingDateTime - now < 2 * 60 * 60 * 1000 || deleting === booking._id;

              return (
                <div
                  key={booking._id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-teal-700">
                      <strong>Departure Time:</strong> {booking.time}
                    </h2>
                    <span className="text-teal-500 font-medium">
                      {new Date(booking.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <strong>From:</strong> {booking.from}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>To:</strong> {booking.to}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Flight Number:</strong> {booking.flight_number}
                  </p>
                  <button
                    disabled={disableButton}
                    onClick={() => handleDelete(booking._id)}
                    className={`w-full py-2 font-bold rounded-lg transition-colors ${
                      disableButton
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-teal-600 text-white hover:bg-teal-700"
                    }`}
                  >
                    {deleting === booking._id ? "Deleting..." : "Delete Booking"}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">
            You don't have any upcoming bookings.
          </p>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
