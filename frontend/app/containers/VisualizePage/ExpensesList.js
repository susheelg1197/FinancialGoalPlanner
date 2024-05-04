import React, { useState, useEffect } from 'react';
import { getUserExpenses } from '../../utils/api';
import './Expenses.css';

const ExpensesList = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.log('Authentication token not found.');
                return;
            }
            try {
                const fetchedExpenses = await getUserExpenses(token);
                setExpenses(fetchedExpenses);
            } catch (error) {
                console.error('Failed to fetch expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div className="container">
            {/* <h1>Expenses</h1> */}
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id} className="expense-item">
                        <span className="expense-title">{expense.title}</span>
                        <span className="expense-amount">${expense.amount}</span>
                        <span className="badge">{expense.category}</span>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpensesList;
