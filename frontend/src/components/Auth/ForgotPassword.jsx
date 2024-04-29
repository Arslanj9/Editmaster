import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate email format
      const isValidEmail = /\S+@\S+\.\S+/.test(email);
      if (!isValidEmail) {
        setErrorMessage("Invalid email format");
        return;
      }

      // Send a request to your backend API to initiate the password reset process
      const response = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Password reset link sent to your email");
        setEmail("");
      } else {
        // Handle error response from the server
        const errorMessage = await response.text();
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };



  
  return (
    <>
      {/* <h2>Forgot Password</h2>
        <p>Please enter your email address to reset your password:</p>
        <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
        />
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Reset Password
        </button> */}

      <div className='d-flex flex-column vh-100 align-items-center justify-content-center'>
        <div className='container' style={{maxWidth: "400px", minWidth: "50px", width: "90%"}}>
        
      <h2>Forgot Password</h2>
        <p>Please enter your email address to reset your password:</p>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
        <button
          type="submit"
          className="btn btn-primary mt-2"
          onClick={handleSubmit}
        >
          Reset Password
        </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
