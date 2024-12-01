import React, { useContext, useState } from 'react';
import popUpContext from '../Context/popup';
import { postBooking } from '../Services/fligth';
import { authUser } from '../Services/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const PersonalInfo = () => {
  const {user}=useContext(UserContext)
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    departureDate: '',
    from:'',
    to:''
  });

  const { selectedSeats, flight_number, userId, setIsModalOpen,time } = useContext(popUpContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const auth = await authUser();

      if (auth.status === 200) {
        const payload = {
          bookedSeats: selectedSeats,
          userId:user.id,
          flight_number,
          id: userId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          date: formData.departureDate,
          from:formData.from,
          to:formData.to,
          time:time
        };

        const response = await postBooking(payload);

        if (response.status === 200) {
          alert('Booking successful!');
          setIsModalOpen(false); // Close modal on success
        } else {
          alert('Booking failed. Please try again.');
        }
      } else {
        alert('User not authenticated. Redirecting to login...');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      alert('An unexpected error occurred. Please try again.');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg">
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center text-blue-600">
            {step === 1 ? 'Personal Information' : step === 2 ? 'Flight Details' : 'Confirm & Book'}
          </h2>

          <form onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 mt-2"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 mt-2"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 mt-2"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address" className="text-sm font-semibold text-gray-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 mt-2"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="departureDate" className="text-sm font-semibold text-gray-700">From</label>
                  <input
                    type="text"
                    id="from"
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 mt-2"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="departureDate" className="text-sm font-semibold text-gray-700">To</label>
                  <input
                    type="text"
                    id="to"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 mt-2"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="departureDate" className="text-sm font-semibold text-gray-700">Departure Date</label>
                  <input
                    type="date"
                    id="departureDate"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 mt-2"
                    required
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Review your details</h3>
                <div className="text-gray-700 space-y-2">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Address:</strong> {formData.address}</p>
                  <p><strong>Flight Number:</strong> {flight_number}</p>
                  <p><strong>Departure Date:</strong> {formData.departureDate}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                >
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  Book Now
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
