import React, { useState } from 'react';
import { Form, Label, Input, Button } from './formStyles';
import { registerUser } from '../../utils/api';

const UserRegister = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    console.log("here?")
    event.preventDefault();
    try {
      const data = await registerUser(username, email, password);
      console.log('Registration Success:', data);
      history.push('/login'); // Redirect user to login page after successful registration
    } catch (error) {
      setError(error.message || 'Failed to register');
    }
  };

  const handleLoginRedirect = () => {
    history.push('/login');  
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Username:
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Label>
      <Label>
        Email:
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Label>
      <Label>
        Password:
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Label>
      <Button type="submit">Register</Button>
      <Button type="button" onClick={handleLoginRedirect}>Login</Button>
    </Form>
  );
};

export default UserRegister;
