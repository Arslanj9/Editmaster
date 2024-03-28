import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/api';
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
    <div className="registration-container">
      <h2>Register</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
