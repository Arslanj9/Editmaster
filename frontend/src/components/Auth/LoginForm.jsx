import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/api';
import google_icon from '../../../public/assets/google_icon.png'
import facebook_icon from '../../../public/assets/facebook_icon.png'
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


  return (
    <>
      <main class="form-signin w-100 vh-100  m-auto ">
        <div className='d-flex flex-column vh-100 align-items-center justify-content-center'>

        <form className='container' style={{maxWidth: "50px", minWidth: "400px"}}>

          <h4 className="mb-4 mt-1 fw-bold text-center">Sign in to your account</h4>

          <input type="email" className="form-control mt-1" id="floatingInput" placeholder="Email"/>
          <input type="password" className="form-control mt-1" id="floatingPassword" placeholder="Password"/>

          <button type="submit" className='btn btn-outline-primary w-100 mt-3'>Login</button>
          {error && <p className="error-message">{error}</p>}
          <div className="line-container mt-4">
            <div className="line"></div>
            <div className="text-inside">or alternatively</div>
          </div>


          <a className="btn btn-primary mt-4 w-100" style={{fontSize: "19px", backgroundColor: "transparent", borderColor: "#002440", color: "#00345c", }} href="#" role="button">
            {/* <FontAwesomeIcon icon={faTwitter} className="me-2" /> */}
            {/* <FontAwesomeIcon icon={faTwitter} /> */}
            <img src={google_icon} style={{width: "23px"}} className='me-2 mb-1' alt="google icon" />
            Sign in with Google
          </a>
          <a className="btn btn-primary mt-2 w-100" style={{fontSize: "19px", backgroundColor: "transparent", borderColor: "#002440", color: "#00345c", }} href="#" role="button">
            {/* <FontAwesomeIcon icon={faTwitter} className="me-2" /> */}
            {/* <FontAwesomeIcon icon={faTwitter} /> */}
            <img src={facebook_icon} style={{width: "23px"}} className='me-2 mb-1' alt="google icon" />
            Sign in with Facebook
          </a>
        </form>
        </div>
      </main>  
    </>


      // =============================================
      //  -------------- THIS IS WORKING -------------
      // ==============================================
    // <div className="login-container">
    //   <h2>Login</h2>
    //   <form className="login-form" onSubmit={handleSubmit}>
    //     <label>
    //       Email:
    //       <input
    //         type="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         required
    //       />
    //     </label>
    //     <br />

    //     <label>
    //       Password:
    //       <input
    //         type="password"
    //         name="password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         required
    //       />
    //     </label>
    //     <br />

    //     <button type="submit">Login</button>

    //     {error && <p className="error-message">{error}</p>}
    //   </form>
    // </div>
    // =============================================
    // |-------------- THIS IS WORKING -------------|
    // ==============================================
  );
};

export default LoginForm;
