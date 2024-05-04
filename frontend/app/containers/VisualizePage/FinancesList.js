import React, { useState, useEffect } from 'react';
import { getUserFinances } from '../../utils/api';
import './Finances.css';

const FinancesList = () => {
    const [finances, setFinances] = useState([]);

    useEffect(() => {
        const fetchFinances = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.log('Authentication token not found.');
                return;
            }
            try {
                const fetchedFinances = await getUserFinances(token);
                setFinances(fetchedFinances);
            } catch (error) {
                console.error('Failed to fetch finances:', error);
            }
        };

        fetchFinances();
    }, []);

    return (
        <div className="container">
            <ul>
                {finances.map(finance => (
                    <li key={finance.id} className="finance-item">
                        <span className="expense-title">{finance.title}</span>
                        <span className="expense-amount">${finance.amount}</span>
                        <span className="badge">{finance.type}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FinancesList;
