import React, { createContext, useState } from "react";

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flight, setFlight] = useState();

  return (
    <FlightContext.Provider value={{ flight, setFlight }}>
      {children}
    </FlightContext.Provider>
  );
};
