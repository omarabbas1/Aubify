import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState(""); // Add state for user avatar
  const [isAdmin, setIsAdmin] = useState();

  const value = {
    username,
    setUsername,
    userAvatar, // Include userAvatar in the context value
    setUserAvatar, // Include setUserAvatar function in the context value
    isAdmin,
    setIsAdmin,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
