import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header'
import Dashboard from "./Dashboard"

const Home = () => {

  const [ userLoggedIn, setUserLoggedIn ] = useState(false)

  useEffect(() => {
    // Check if token is present in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // If token is present, set userLoggedIn to true
      setUserLoggedIn(true);
    }
  }, []);

  return (
    <div className='vh-100'>
      { userLoggedIn ? 
        <Dashboard />
      : 
      <div>
          <Header />
          <div className="home-container mx-auto text-center" style={{marginTop: "100px", maxWidth: "700px", minWidth: "50px", width: "90%"}}>
              <h2 className='fw-bold'>Welcome to EditMaster, Your PDF and Image Editor</h2>
              <p>Please create an account or log in to explore our features</p>
          </div>
        </div>}
      
      
    </div>
  );
};

export default Home;
