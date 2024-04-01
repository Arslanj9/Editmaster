import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/api';
import google_icon from '../../assets/google_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'
import './RegistrationForm.css';


const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      if (response && response.data) {
        console.log('User registered:', response.data);

        navigate('/login');
      } else {
        console.error('Registration failed: Unexpected response format', response);
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
    }
  };




  return (
    <>
      <main className="registration-form w-100 vh-100  m-auto ">
        <div className='d-flex flex-column vh-100 align-items-center justify-content-center'>

        <form onSubmit={handleSubmit} className='container' style={{maxWidth: "50px", minWidth: "400px"}}>

          <h4 className="mb-4 mt-1 fw-bold text-center">Register a new account</h4>

          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control mt-1" placeholder="Username"/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-control mt-1" placeholder="Email"/>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="form-control mt-1" placeholder="Password"/>

          <button type="submit" className='btn btn-outline-primary w-100 mt-3'>Register</button>
          {/* {error && <p className="error-message">{error}</p>} */}
          <div className="line-container mt-4">
            <div className="line"></div>
            <div className="text-inside">or alternatively</div>
          </div>


          <a className="btn btn-primary mt-4 w-100" style={{fontSize: "19px", backgroundColor: "transparent", borderColor: "#002440", color: "#00345c", }} href="#" role="button">
            <img src={google_icon} style={{width: "23px"}} className='me-2 mb-1' alt="google icon" />
            Sign in with Google
          </a>
          <a className="btn btn-primary mt-2 w-100" style={{fontSize: "19px", backgroundColor: "transparent", borderColor: "#002440", color: "#00345c", }} href="#" role="button">
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
    // <div className="registration-container">
    //   <h2>Register</h2>
    //   <form className="registration-form" onSubmit={handleSubmit}>
    //     <label>
    //       Username:
    //       <input
    //         type="text"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleChange}
    //         required
    //       />
    //     </label>
    //     <br />

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

    //     <button type="submit">Register</button>
    //   </form>
    // </div>
    // =============================================
      //  -------------- THIS IS WORKING -------------
      // ==============================================
  );
};

export default RegistrationForm;
