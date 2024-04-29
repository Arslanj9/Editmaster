import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const ForgotPasswordModal = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate email format
      const isValidEmail = /\S+@\S+\.\S+/.test(email);
      if (!isValidEmail) {
        setErrorMessage('Invalid email format');
        return;
      }

      // Send a request to your backend API to initiate the password reset process
      const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage('Password reset link sent to your email');
        setEmail('');
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
    <>
      <div>
      <div
        className="text-primary mt-2"
        data-bs-toggle="modal"
        data-bs-target="#forgotPasswordModal"
        style={{ cursor: 'pointer', textDecoration: 'underline', fontSize: '16px' }}
      >
        Forgot Password?
      </div>

      {/* Modal for forgot password */}
      <div id="forgotPasswordModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="forgotPasswordModalLabel">
                Forgot Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <p>Please enter your email address to reset your password:</p>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ForgotPasswordModal;
