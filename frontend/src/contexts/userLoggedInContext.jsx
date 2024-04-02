import React, { createContext, useState } from 'react'

export const UserLoggedInContext = createContext()

const UserLoggedInProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggeedIn] = useState(false)

    const login = () => setIsLoggeedIn(true)
    const logout = () => setIsLoggeedIn(false)

  return (
    <UserLoggedInContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserLoggedInContext.Provider>
  )
}

export default UserLoggedInProvider