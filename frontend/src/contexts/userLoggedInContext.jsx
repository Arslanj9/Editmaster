import React, { createContext, useState, useEffect } from 'react'

export const UserLoggedInContext = createContext()

const UserLoggedInProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
      // Check if token exists in localStorage
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);
  
    const login = () => {
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      // Clear token from localStorage
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    };


  return (
    <UserLoggedInContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserLoggedInContext.Provider>
  )
}

export default UserLoggedInProvider