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
        console.error('Create Finance Error:', error.response.data);
        throw error;
    }
};

export const getUserGoals = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/financial_goals/by_user`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Fetch goals by user Error:', error.response.data);
        throw error;
    }
};

export const getUserExpenses = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/expenses/by_user`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Fetch expenses by user Error:', error.response.data);
        throw error;
    }
};

export const getUserExpensesByYear = async (token,year) => {
    try {
        const response = await axios.get(`${API_URL}/expenses/year/${year}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Fetch user expenses by year Error:', error.response.data);
        throw error;
    }
};


export const getUserFinances = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/finances/by_user`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Fetch finances by user Error:', error.response.data);
        throw error;
    }
};

export const chat = async (token, message) => {
    try {
        const response = await axios.post(`${API_URL}/chat`, message, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to chat:', error.response.data);
        throw error;
    }
};

export const getUserFinancesByYear = async (token,year) => {
    try {
        const response = await axios.get(`${API_URL}/finances/year/${year}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Fetch user finances by year Error:', error.response.data);
        throw error;
    }
};