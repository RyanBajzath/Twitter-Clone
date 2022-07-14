// CreateContext time for fetching user data
import { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCurrentUser(data);
        setStatus("idle");
        // console.log(data);
        // console.log(setStatus("idle"));
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

//this is wrapped around App.js
