// src/context/UserContext.js
import { createContext, useContext, useState } from "react";
import defaultImage from "../assets/avatar.png";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: "Aleme",
    lastName: "Kassa",
    email: "cutiepie@gmail.com",
    profileImage: defaultImage,
    tokens: 300,
    totalMiles: 198,
    totalRides: 5,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useUser = () => useContext(UserContext);
