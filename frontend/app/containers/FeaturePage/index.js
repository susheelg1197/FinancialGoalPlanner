import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import H1 from 'components/H1';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';
import { chat } from '../../utils/api';

const StyledDiv = styled.div`
  padding: 20px;
  background-color: #f4f4f8;
`;

const ChatContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const Message = styled.div`
  padding: 10px;
  margin-bottom: 8px;
  background: ${props => props.isUser ? '#dcf8c6' : '#ffffff'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  border-radius: 20px;
  border: 1px solid #ccc;
`;

const InputContainer = styled.form`
  display: flex;
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-right: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

export default function FeaturePage() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userMessage = { text: query, isUser: true };
    setMessages([...messages, userMessage]);
    const token = localStorage.getItem('authToken');  // Ensure this matches how you're storing your token

    if (!token) {
      toast.error('Authentication required. Please log in.');
      return;
    }

    const message = {
      message: userMessage.text,
    };

    try {
      const response = await chat(token, message);
      setMessages(messages => [...messages, { text: response.response, isUser: false }]);
      setQuery('');
    } catch (error) {
      console.error('Error while chatting:', error);
      setMessages(messages => [...messages, { text: 'Failed to fetch response from chatbot.', isUser: false }]);
    }
  };

  return (
    <StyledDiv>
      <Helmet>
        <title>Feature Page</title>
        <meta name="description" content="Feature page of React.js Boilerplate application" />
      </Helmet>
      <H1>Help Center</H1>
      <p>Welcome to the Help Center of Financial Goal Planner! Here, you will find all the resources needed to navigate and maximize the benefits of our app.</p>
      <List>
        <ListItem>
          <ListItemTitle>Smart Saving Tips</ListItemTitle>
          <p>Maximize your savings by reviewing your subscriptions and recurring expenses. Consider automating a fixed amount into a savings account each month to build your savings effortlessly.</p>
        </ListItem>
        <ListItem>
          <ListItemTitle>Goal Prioritization</ListItemTitle>
          <p>When managing multiple goals, prioritize based on necessity and deadlines. Use our 'Prioritize' feature to rearrange your goals according to their importance.</p>
        </ListItem>
        <ListItem>
          <ListItemTitle>Expense Reduction Strategies</ListItemTitle>
          <p>Reduce monthly costs by switching to less expensive alternatives for services like internet and streaming. Also, take advantage of cash-back and rewards programs whenever possible.</p>
        </ListItem>
      </List>
      <h1>Ask Anything</h1>
      {/* <p>powered by GPT-3.5</p> */}
      <div>Start by saying "what are my financial goals? or what are my latest expenses?"</div>
      <ChatContainer>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>
            {msg.text}
          </Message>
        ))}
      </ChatContainer>
      <InputContainer onSubmit={handleSubmit}>
        <Input type="text" value={query} onChange={handleQueryChange} placeholder="Ask a question" />
        <Button type="submit">Send</Button>
      </InputContainer>
    </StyledDiv>
  );
}
