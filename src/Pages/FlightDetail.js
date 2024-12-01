import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { flightDetail, getBooking } from '../Services/fligth';
import { postBooking } from '../Services/fligth';
import PersonalInfo from './PersonalInfo';
import popUpContext from '../Context/popup';
import Navbar from '../Components/Navbar';
import { FlightContext } from '../Context/FlightContext';
function FlightDetail() {
  const {flight}=useContext(FlightContext)
  const { id } = useParams();
  const navigate=useNavigate();
  const [flightData, setFlightData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]); // Track selected seats
  const [bookedSeat, setBookedSeat] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  useEffect(() => {
    const bookedSeats = async () => {
      try{
      const response = await getBooking(id);
      const seatsArray = response.data.flatMap((item) => item.bookedSeats || []);
      setBookedSeat(seatsArray);
      }catch(error){
        navigate('/404')
      }
    };

    bookedSeats();
  }, [isModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await flightDetail(id);
        setFlightData(response.data.Flight); // Ensure this is correct per your API response structure
      } catch (error) {
        console.log('Error fetching flight data', error);
      }
    };
    fetchData();
  }, [id]);

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatId)) {
        return prevSelected.filter((id) => id !== seatId);
      } else {
        return [...prevSelected, seatId];
      }
    });
  };

 

  const handleModal=()=>{
    setIsModalOpen(!isModalOpen)
  }
  const SeatPlan = () => {
    const bookedSeats = bookedSeat || [];
    return (
      <div className="grid grid-cols-4 gap-4 p-4">
        {Array.from({ length: flightData.seats || 0 }).map((_, seatIndex) => {
          const seatId = seatIndex + 1;
          const isBooked = bookedSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);

          return (
            <div
              key={seatId}
              className={`seat p-4 rounded-md flex justify-center items-center cursor-pointer transition-transform ${
                isBooked ? 'bg-red-500 cursor-not-allowed' : isSelected ? 'bg-green-500' : 'bg-gray-300'
              } ${!isBooked && 'hover:scale-105'}`}
              onClick={() => !isBooked && toggleSeatSelection(seatId)}
            >
              {seatId}
            </div>
          );
        })}
      </div>
    );
  };

  if (!flightData) return <div>Loading...</div>;

  return (
    <div>
      <Navbar/>
      {/* Personal Info Modal */}
      {isModalOpen && (
  <popUpContext.Provider 
    value={{
      selectedSeats, 
      flight_number:flightData._id, 
      userID:localStorage.getItem('id'),  // Extracted value for clarity
      isModalOpen, 
      setIsModalOpen,
      time:flightData.time
    }}
  >
    <PersonalInfo />
  </popUpContext.Provider>
)}


      <div className="flex flex-col lg:flex-row p-6 gap-6">
        {/* Left side: Seat Plan */}
        <div className="lg:w-1/2 p-6 bg-blue-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-800">Seat Plan</h2>
          <SeatPlan />
        </div>

        {/* Right side: Flight Details */}
        <div className="lg:w-1/2 p-6 bg-white rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Flight Details</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Flight Number:</span>
              <span>{flightData.flight_number}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Airline:</span>
              <span>{flightData.airline}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Origin:</span>
              <span>{flightData.origin}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Destination:</span>
              <span>{flightData.destination}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Date:</span>
              <span>{flightData.date}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Time:</span>
              <span>{flightData.time}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Price:</span>
              <span>{flightData.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Available Seats:</span>
              <span>{flightData.seats - (flightData.bookedSeats?.length || 0)}</span>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleModal} // Open the personal info modal
              className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-700 transition-colors"
              disabled={selectedSeats.length === 0}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightDetail;

