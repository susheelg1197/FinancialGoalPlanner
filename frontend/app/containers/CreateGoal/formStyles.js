import styled from 'styled-components';

export const StyledForm = styled.form`
  max-width: 100%;  // Increased from 600px to 800px
  margin: 40px;  // Adjusted for better vertical spacing
  padding: 30px;  // Increased padding for a better internal spacing
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-size: 16px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px;  // Increased padding for better touch area
  margin-top: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;  // Slightly thicker border for better visibility
  border-radius: 4px;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 12px;  // Consistent padding with StyledInput
  margin-top: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;  // Consistent border with StyledInput
  border-radius: 4px;
  height: 150px;  // Increased height for better visual space for text entry
`;


export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 15px;  // Increased padding for a larger button
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;  // Darker blue on hover for better feedback
  }
`;
