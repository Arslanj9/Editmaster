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
    return response;
  } catch (error) {
    throw error.response.data;
  }
};


export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/users`, {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWMzYThlY2ZhMTRjNDIxYTM4YzhlNGQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDczOTI1NzQsImV4cCI6MTcwNzM5NjE3NH0.4lpFo_ozZlcew0ilnHDqQ4kRrQ2WSDk-5n9dFSS6GV0', 
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


