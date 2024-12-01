# flight-app-frontend

Step 1:
install axios, react-router-dom, tailwindcss

step 2:
configure tailwind css like this :

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


step 3: 
configue index.css like this:

@tailwind base;
@tailwind components;
@tailwind utilities;

step 4:
npm start 

Features:
1. View all upcoming bookings
2. view upcoming bookings based on search criteria
3. flight booking with available seat
4. real time seat staus update
5. delete a booking before 2 hours before the flight
6. booking confirmation email
7. view upcoming my bookings
8. person data edit option
9. login, logout , user authentication
10. responsive (without navigation menu)
11. new user creation

N.B. Frontend is not version controlled due to netlify error 
