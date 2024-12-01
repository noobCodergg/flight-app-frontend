import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import SearchResult from "./Pages/SearchResult";
import SystemOverview from "./Components/SystemOverview";
import CreateFlight from "./Pages/CreateFlight";
import AllFlights from "./Pages/AllFlights";
import Navbar from "./Components/Navbar";
import FlightDetail from "./Pages/FlightDetail";
import AdminNav from "./Components/AdminNav";
import MyProfile from "./Pages/MyProfile";
import MyBookings from "./Pages/MyBookings";
import ManageUpcomingBookings from "./Pages/ManageUpcomingBookings";
import ManageFlights from "./Pages/ManageFlights";
import { UserProvider } from "./Context/UserContext";
import { FlightProvider } from "./Context/FlightContext";
import Error500 from "./Pages/Error500";
import Error404 from "./Pages/Error404";

function App() {
  
  return (
    <div className="App">
      <UserProvider>
        <FlightProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
          <Route path="/" element={<Navbar/>}>
           <Route index element={<SystemOverview/>}/>
           <Route path="allflights" element={<AllFlights/>}/>
          </Route>
          <Route path="/searchresult" element={<SearchResult/>}/>
          <Route path="/flights/:id" element={<FlightDetail/>}/>

          <Route path="/dashboard" element={<AdminNav/>}>
          <Route index element={<SystemOverview/>}/>
           <Route path="allflights" element={<AllFlights/>}/>
           <Route path="createflight" element={<CreateFlight/>}/>
           <Route path="managebooking" element={<ManageUpcomingBookings/>}/>
           <Route path="manageflight" element={<ManageFlights/>}/>
          </Route>
          
          <Route path="/myprofile" element={<MyProfile/>}/>
          <Route path="/mybookings" element={<MyBookings/>}/>
          <Route path="*" element={<Error500/>}/>
          <Route path="/404" element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
      </FlightProvider>
      </UserProvider>
    </div>
  );
}

export default App;



