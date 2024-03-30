import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, userData);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};


// Function to log in a user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);
    const token = response.data.token;
    localStorage.setItem('token', token)
    return response;
  } catch (error) {
    throw error.response.data;
  }
};


export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/users`, {
      headers: {
        Authorization: `${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


