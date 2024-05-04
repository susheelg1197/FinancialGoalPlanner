import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error.response.data);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Login Error:', error.response.data);
    throw error;
  }
};
