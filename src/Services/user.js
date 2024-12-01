import axios from "axios";

// Create an instance of Axios for API requests
const API = axios.create({
  baseURL: "https://fligth-app-server-1.onrender.com/api", // Replace with your backend's base URL
  withCredentials: true, // Allow cookies to be sent with requests (if needed)
});

// Get user details
export const userDetail = (id) => API.get(`/user/user/${id}`);  // Corrected dynamic URL for user detail

// Update user data
export const updateUser = (id, updatedData) => API.put(`/user/update/${id}`, updatedData);  // Update user data by ID
export const getUserBookings=(id)=>API.get(`/user/userbooking/${id}`)
export const deleteBooking=(bookingId)=>API.delete(`/user/deletebooking/${bookingId}`)
export const updateBooking = (bookingId,booking) => API.put(`/user/updatebooking/${bookingId}`, booking); 
export const allBooking=()=>API.get('/user/allbooking')
export const removeBooking=(flightId)=>API.delete(`/user/deletebookingselect/${flightId}`)
export const updatebookingdetail=(flightId,date,time)=>API.put(`/user/updatebookingdetail/${flightId}`,{date,time})
export default API;
