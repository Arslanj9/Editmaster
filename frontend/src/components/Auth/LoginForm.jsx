import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/api';
import google_icon from '../../assets/google_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'
import './LoginForm.css'; 

const LoginForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response && response.data) {
        const { role } = response.data;

        // Redirect based on user role
        if (role === 'admin') {
          navigate('/dashboard/admin');
        } else {
          navigate('/dashboard/user');
        }
      } else {
        console.error('Login failed: Unexpected response format', response);
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('Invalid credentials. Please try again.');
    }
  };


  const handleFacebookLogin = () => {
    // Redirect the user to the server route for Facebook authentication
    window.location.href = 'http://localhost:3000/api/auth/facebook';
  };

  const handleGoogleLogin = () => {
    // Redirect the user to the server route for Google authentication
    window.location.href = 'http://localhost:3000/api/auth/google';
  };



  // ===================================
  // |----------- Return --------------|
  // ===================================  
  return (
    <>
      <main className="form-signin w-100 vh-100  m-auto ">
        <div className='d-flex flex-column vh-100 align-items-center justify-content-center'>

        <form onSubmit={handleSubmit} className='container' style={{maxWidth: "400px", minWidth: "50px", width: "90%"}}>

          <h4 className="mb-4 mt-1 fw-bold text-center">Sign in to your account</h4>

          <input name='email' type="email" value={formData.email} onChange={handleChange} required className="form-control mt-1" id="floatingInput" placeholder="Email"/>
          <input name='password' type="password" value={formData.password} onChange={handleChange} required className="form-control mt-1" id="floatingPassword" placeholder="Password"/>

          <button type="submit" className='btn btn-outline-primary w-100 mt-3'>Login</button>
          {error && <p className="error-message">{error}</p>}
          <div className="line-container mt-4">
            <div className="line"></div>
            <div className="text-inside">or alternatively</div>
          </div>


          <a onClick={handleGoogleLogin} className="btn btn-primary mt-4 w-100" style={{fontSize: "19px", backgroundColor: "transparent", borderColor: "#002440", color: "#00345c", }} href="#" role="button">
            <img src={google_icon} style={{width: "23px"}} className='me-2 mb-1' alt="google icon" />
            Sign in with Google
          </a>
          <a onClick={handleFacebookLogin} className="btn btn-primary mt-2 w-100" style={{fontSize: "19px", backgroundColor: "transparent", borderColor: "#002440", color: "#00345c", }} href="#" role="button">
            <img src={facebook_icon} style={{width: "23px"}} className='me-2 mb-1' alt="google icon" />
            Sign in with Facebook
          </a>
        </form>
        </div>
      </main>  
    </>

  );
};

export default LoginForm;
