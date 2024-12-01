import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "http://localhost:8000/api", // Replace with your backend's base URL
  withCredentials: true, // Allow cookies to be sent with requests
});

export const registerUser = (userData) => API.post("/auth/register", userData);
export const logInUser=(logInData)=>API.post("/auth/login",logInData)

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

API.interceptors.request.use((req) => {
  const token = getCookie('token'); // Get the token from cookies
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export const authUser=()=>API.get("/auth/authUser")
export const adminAuth=()=>API.get("auth/adminDashboard")
export const logOut=()=>API.post("/auth/logout")

export default API;
