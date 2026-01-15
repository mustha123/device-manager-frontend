import React, { createContext } from "react";

export const UserContext = createContext();

export default function ContextProvider({ children }) {
  const host = process.env.REACT_APP_API_URL;

  return (
    <UserContext.Provider value={{ host }}>
      {children}
    </UserContext.Provider>
  );
}
