import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api", // Replace with your backend's base URL
    withCredentials: true, // Allow cookies to be sent with requests
  });

  export const postFlight=(flightData)=>API.post("/flight/createflight",flightData)
  export const allFLight=()=>API.get('/flight/flights')
  export const searchFLight=(from,to,date)=>API.get('/flight/searchflights',{
    params:{from,to,date}
  })

  export const flightDetail=(id)=>API.get(`/flight/getflightdetails/${id}`)
  export const postBooking = (payload) => API.post('/flight/postbooking', payload);
  export const getBooking=(flight_number)=>API.get('/flight/getbookings',{params:{flight_number}})
  export const updateFlight=(flightId,Flight)=>API.put(`/flight/updateflight/${flightId}`,Flight);
  export const deleteFlight=(id)=>API.delete(`/flight/deleteflight/${id}`);
  export default API;