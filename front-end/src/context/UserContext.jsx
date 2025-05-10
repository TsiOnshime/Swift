import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage
    const stored = localStorage.getItem("user");
    return stored
      ? JSON.parse(stored)
      : {
          email: "",
          fullname: { firstname: "", lastname: "" },
        };
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
