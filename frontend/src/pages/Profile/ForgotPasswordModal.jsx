import React, { useState } from 'react';

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate email format (you can use a library like validator.js for more comprehensive email validation)
      const isValidEmail = /\S+@\S+\.\S+/.test(email);
      if (!isValidEmail) {
        // Handle invalid email format
        console.error('Invalid email format');
        return;
      }

      // Send a request to your backend API to initiate the password reset process
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Password reset email sent successfully
        console.log('Password reset email sent successfully');
        // Optionally, display a success message to the user or redirect them to a confirmation page
      } else {
        // Handle error response from the server
        const errorMessage = await response.text();
        console.error('Error sending password reset email:', errorMessage);
        // Display an error message to the user
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      // Display an error message to the user
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#forgotPasswordModal"
      >
        Forgot Password?
      </button>

      {/* Modal for forgot password */}
      <div
        className="modal fade"
        id="forgotPasswordModal"
        tabIndex="-1"
        aria-labelledby="forgotPasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
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
                <p>Please enter your email address to reset your password:</p>
                <input
                  type="email" // Use type="email" for email input
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;
