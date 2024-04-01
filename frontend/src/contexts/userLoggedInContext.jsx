import React, { createContext, useState } from 'react'

export const UserLoggedInContext = createContext()

const UserLoggedInProvider = ({ children }) => {

    const [userLoggedIn, setUserLoggedIn] = useState(false)

  return (
    <UserLoggedInContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      {children}
    </UserLoggedInContext.Provider>
  )
}

export default UserLoggedInProvider