import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
//   const [resetToken, setResetToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { token } = useParams()
  console.log(`token is ${token}`)
  
//   const location = useLocation();

//   useEffect(() => {
//     // Extract reset token from the URL
//     // const query = location.search.substring(1); // Remove the leading '?'
//     // const token = query.split('=')[1]; // Extract the token after '='
//     // setResetToken(token);
//   }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include resetToken in the request body
      const response = await fetch(`http://localhost:3000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (response.ok) {
        setSuccessMessage('Password reset successfully');
        setPassword('');
      } else {
        // Handle error response from the server
        const errorMessage = await response.text();
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };




  return (
    <div className='d-flex flex-column vh-100 align-items-center justify-content-center'>
        <div className='container' style={{maxWidth: "400px", minWidth: "50px", width: "90%"}}>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="password"
            className="form-control"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type="submit" className="btn btn-primary mt-3">
            Update Password
            </button>
        </form>
        </div>
    </div>
  );
};

export default ResetPassword;
