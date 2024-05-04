import React, { useState } from 'react';
import { StyledForm, StyledLabel, StyledInput, StyledTextArea, StyledSelect, StyledButton } from './formStyles';
import { toast } from 'react-toastify';
import { createFinancialGoal } from '../../utils/api';


const CreateGoalPage = ({history}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [currentAmount, setCurrentAmount] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [category, setCategory] = useState('savings');
    const [status, setStatus] = useState('inprogress');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');  // Ensure this matches how you're storing your token

        if (!token) {
            toast.error('Authentication required. Please log in.');
            return;
        }

        const goalData = {
            name,
            description,
            startDate,
            endDate,
            currentAmount: currentAmount,
            targetAmount:targetAmount,
            category
        };

        try {
            await createFinancialGoal(goalData, token);
            toast.success('Goal created successfully!');
            history.push('/visualization');
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                ? error.response.data.message
                : 'Failed to create goal. Please try again.'+ error;
            toast.error(message);
        }

        // Add your API call or state management logic here
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>Goal Name:</StyledLabel>
            <StyledInput type="text" required value={name} onChange={(e) => setName(e.target.value)} />

            <StyledLabel>Description:</StyledLabel>
            <StyledTextArea required value={description} onChange={(e) => setDescription(e.target.value)}></StyledTextArea>

            <StyledLabel>Current Amount:</StyledLabel>
            <StyledInput type="text" required value={currentAmount} onChange={(e) => setCurrentAmount(e.target.value)} />

            <StyledLabel>Target Amount:</StyledLabel>
            <StyledInput type="text" required value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} />

            
            <StyledLabel>Category:</StyledLabel>
            <StyledSelect value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="savings">Savings</option>
                <option value="healthcare">Healthcare</option>
                <option value="retirement">Retirement</option>
                <option value="travel">Travel</option>
                <option value="emergency">Emergency</option>
            </StyledSelect>

            <StyledLabel>Status:</StyledLabel>
            <StyledSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="inprogress">In-progress</option>
                <option value="done">Done</option>
            </StyledSelect>

            <StyledLabel>Start Date:</StyledLabel>
            <StyledInput type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />

            <StyledLabel>End Date:</StyledLabel>
            <StyledInput type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />

            <StyledButton>Add Goal</StyledButton>
        </StyledForm>
    );
};

export default CreateGoalPage;
