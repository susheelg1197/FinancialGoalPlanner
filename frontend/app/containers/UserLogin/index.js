import React, { useState, useContext } from 'react';
import { Form, Label, Input, Button } from './formStyles';
import { loginUser } from '../../utils/api';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const UserLogin = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthToken } = useContext(AuthContext);
  console.log({ setAuthToken });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(username, password);
      setAuthToken(response.access_token); 
      localStorage.setItem('authToken', response.access_token); 
      toast.success('Login successful'); 
      history.push('/home'); 
    } catch (error) {
      toast.error(error.message || 'Login failed'); 
    }
  };

  const handleRegisterRedirect = () => {
    history.push('/register');  
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Username:
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Label>
      <Label>
        Password:
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Label>
      <Button type="submit">Login</Button>
      <Button type="button" onClick={handleRegisterRedirect}>Register</Button>

    </Form>
  );
};

export default UserLogin;
