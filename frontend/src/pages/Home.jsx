import React from 'react';
import Header from '../components/common/Header'

const Home = () => {
  
  const handleFacebookLogin = () => {
    // Redirect the user to the server route for Facebook authentication
    window.location.href = 'http://localhost:3000/api/auth/facebook';
  };

  const handleGoogleLogin = () => {
    // Redirect the user to the server route for Google authentication
    window.location.href = 'http://localhost:3000/api/auth/google';
  };


  return (
    <div className='vh-100'>
      <Header />
      <div className="home-container mx-auto text-center" style={{marginTop: "100px", maxWidth: "700px", minWidth: "50px", width: "90%"}}>
          <h2 className='fw-bold'>Welcome to EditMaster, Your PDF and Image Editor</h2>
          <p>Please create an account or log in to explore our features</p>
      </div>
    </div>
  );
};

export default Home;
