import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isAdmin, setIsAdmin] = useState();

  const value = {
    username,
    setUsername,
    userAvatar,
    setUserAvatar,
    isAdmin,
    setIsAdmin,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
