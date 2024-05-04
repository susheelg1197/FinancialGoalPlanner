import React, { useState } from 'react';
import { StyledForm, StyledLabel, StyledInput, StyledTextArea, StyledSelect, StyledButton } from './formStyles';
import { toast } from 'react-toastify';
import { createExpense } from '../../utils/api';


const CreateExpensePage = ({ history }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('savings');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');  // Ensure this matches how you're storing your token

        if (!token) {
            toast.error('Authentication required. Please log in.');
            return;
        }

        const expenseData = {
            title,
            amount,
            category
        };

        try {
            await createExpense(expenseData, token);
            toast.success('Expense added successfully!');
            history.push('/visualization');
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                ? error.response.data.message
                : 'Failed to add expense. Please try again.' + error;
            toast.error(message);
        }

    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>Expense Title:</StyledLabel>
            <StyledInput type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />


            <StyledLabel>Category:</StyledLabel>
            <StyledSelect value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="housing">Housing</option>
                <option value="utilities">Utilities</option>
                <option value="groceries">Groceries</option>
                <option value="dining">Dining Out</option>
                <option value="transportation">Transportation</option>
                <option value="vehicle">Vehicle Maintenance</option>
                <option value="healthcare">Healthcare</option>
                <option value="insurance">Insurance</option>
                <option value="leisure">Leisure & Entertainment</option>
                <option value="travel">Travel</option>
                <option value="education">Education</option>
                <option value="gifts_donations">Gifts & Donations</option>
                <option value="clothing">Clothing & Accessories</option>
                <option value="electronics">Electronics</option>
                <option value="personal_care">Personal Care</option>
                <option value="child_care">Child Care</option>
                <option value="pet_care">Pet Care</option>
                <option value="taxes">Taxes</option>
                <option value="other">Other</option>
            </StyledSelect>


            <StyledLabel>Amount:</StyledLabel>
            <StyledInput type="text" required value={amount} onChange={(e) => setAmount(e.target.value)} />


            <StyledButton>Add Expense</StyledButton>
        </StyledForm>
    );
};

export default CreateExpensePage;
