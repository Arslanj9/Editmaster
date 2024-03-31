import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/api';
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

        <form className='container w-25 '>
          
          {/* <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>

          <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button> */}
{/* 
          <div class="form-floating">
           <input
             type="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             placeholder='Email'
             required
           />
          </div>
         <br /> */}

        <h4 class="mb-4 mt-1 fw-bold text-center">Signin to your account</h4>

         <input type="email" className="form-control mt-1" id="floatingInput" placeholder="Email"/>
         <input type="password" className="form-control mt-1" id="floatingPassword" placeholder="Password"/>

         <button type="submit" className='btn btn-outline-primary w-100 mt-3'>Login</button>
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
