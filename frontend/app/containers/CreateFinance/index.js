import React, { useState } from 'react';
import { StyledForm, StyledLabel, StyledInput, StyledTextArea, StyledSelect, StyledButton } from './formStyles';
import { toast } from 'react-toastify';
import { createFinance } from '../../utils/api';


const CreateFinancePage = ({ history }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('savings');
    const [description, setDescription] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');  // Ensure this matches how you're storing your token

        if (!token) {
            toast.error('Authentication required. Please log in.');
            return;
        }

        const financeData = {
            title,
            description,
            amount,
            type
        };

        try {
            await createFinance(financeData, token);
            toast.success('finance added successfully!');
            history.push('/visualization');
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                ? error.response.data.message
                : 'Failed to add finance. Please try again.' + error;
            toast.error(message);
        }

    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>Finance Title:</StyledLabel>
            <StyledInput type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />

            <StyledLabel>Description:</StyledLabel>
            <StyledTextArea required value={description} onChange={(e) => setDescription(e.target.value)}></StyledTextArea>

            <StyledLabel>Type:</StyledLabel>
            <StyledSelect value={type} onChange={(e) => setType(e.target.value)}>
                <option value="assets">Assets</option>
                <option value="equity">Equity</option>
                <option value="revenue">Revenue</option>
                <option value="stocks">Stocks</option>
                <option value="investments">Investments</option>
                <option value="loans">Loans</option>
                <option value="taxes">Taxes</option>
                <option value="savings">Savings</option>
                <option value="retirement_funds">Retirement Funds</option>
                <option value="insurance_policies">Insurance Policies</option>
                <option value="inheritances">Inheritances</option>
                <option value="gifts">Gifts</option>
                <option value="scholarships_grants">Scholarships & Grants</option>
                <option value="other">Other</option>
            </StyledSelect>

            <StyledLabel>Amount:</StyledLabel>
            <StyledInput type="text" required value={amount} onChange={(e) => setAmount(e.target.value)} />


            <StyledButton>Add finance</StyledButton>
        </StyledForm>
    );
};

export default CreateFinancePage;
