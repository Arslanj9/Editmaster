// Inside your component or page
import React from 'react';

const SocialLogin = () => {
  const handleFacebookLogin = () => {
    // Redirect the user to the server route for Facebook authentication
    window.location.href = 'http://localhost:3000/api/auth/facebook';
  };

  const handleGoogleLogin = () => {
    // Redirect the user to the server route for Google authentication
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <div>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default SocialLogin;
