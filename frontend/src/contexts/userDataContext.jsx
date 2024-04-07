import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserDataContext = createContext();


const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [userId, setUserId] = useState();


    // console.log(`this is id: ${userId}`)
    // console.log(`this is userdata: ${JSON.stringify(userData)}`)    


    useEffect(() => {
      // Fetch user data when userId changes
      if (userId) {
        axios.get(`http://localhost:3000/api/auth/userData/${userId}`)
          .then(response => {
            // setUserData(response.data);
            // Store user data in cookies
            document.cookie = `userData=${JSON.stringify(response.data)}; path=/`;
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }
    }, [userId]);


  
    const removeUserData = () => {
      // Clear user data cookie
      document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      // Clear state
      setUserId('');
      setUserData(null);
    };


    const setUser = (id) => {
      setUserId(id);
    };

  
    return (
      <UserDataContext.Provider value={{ setUser, userData, removeUserData }}>
        {children}
      </UserDataContext.Provider>
    );
  };
  
  export default UserDataProvider

// setUser




// ====================
// ----    Tasks   ----
// 1. fetching user data
// 2. updating user data
// =====================