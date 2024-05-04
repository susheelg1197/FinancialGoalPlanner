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

export const createFinancialGoal = async (goalData, token) => {
    try {
      const response = await axios.post(`${API_URL}/financial_goals`, goalData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  
        }
      });
      return response.data;
    } catch (error) {
      console.error('Create Goal Error:', error.response.data);
      throw error;
    }
  };
  
  export const createExpense = async (expenseData, token) => {
    try {
      const response = await axios.post(`${API_URL}/expenses`, expenseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  
        }
      });
      return response.data;
    } catch (error) {
      console.error('Create Expense Error:', error.response.data);
      throw error;
    }
  };
  
  export const createFinance = async (financeData, token) => {
    try {
      const response = await axios.post(`${API_URL}/finances`, financeData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  
        }
      });
      return response.data;
    } catch (error) {
      console.error('Create Fiannce Error:', error.response.data);
      throw error;
    }
  };