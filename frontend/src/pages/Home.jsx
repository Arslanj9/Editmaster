import React from 'react';
import Header from '../components/common/Header'
import './Home.css'; 

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
    <>
      <Header />
      <div className="home-container">
        <h2 className="welcome-header">Welcome to EditMaster, Your PDF and Image Editor</h2>
        
        <p className="intro-text">Please create an account or log in to explore our features</p>
        <div className='auth-links'>
          <button className="auth-link" onClick={handleFacebookLogin}>Login with Facebook</button>
          <button className="auth-link" onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      </div>
    </>
  );
};

export default Home;
