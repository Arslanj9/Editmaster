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


// Function to get all users
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




// Function to update user profile
export const updateUserProfile = async (newName, newEmail) => {
  try {
    const response = await fetch('/api/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // You might need to include authentication headers here depending on your backend setup
      },
      body: JSON.stringify({ name: newName, email: newEmail }),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const updatedUserData = await response.json();
    return updatedUserData;
  } catch (error) {
    throw new Error('Failed to update profile: ' + error.message);
  }
};

// Function to update user password
export const updateUserPassword = async (newPassword) => {
  try {
    const response = await fetch('/api/update-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // You might need to include authentication headers here depending on your backend setup
      },
      body: JSON.stringify({ password: newPassword }),
    });

    if (!response.ok) {
      throw new Error('Failed to update password');
    }

    // Password updated successfully
  } catch (error) {
    throw new Error('Failed to update password: ' + error.message);
  }
};
