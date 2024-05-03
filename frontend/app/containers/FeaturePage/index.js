import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import H1 from 'components/H1';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';


const StyledDiv = styled.div`
  padding: 20px;
  background-color: #f4f4f8;
`;

export default function FeaturePage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      model: "gpt-3.5-turbo",  // Use the appropriate model name like "gpt-3.5-turbo" if available
  messages: [
    {
      role: "user",
      content: query
    }
  ],
  max_tokens: 60
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer <your_key>`
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      setResponse(responseData.choices[0].message.content);
      setQuery(''); 
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
      setResponse('Failed to fetch response from OpenAI.');
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
          <ListItemTitle>
          Smart Saving Tips
          </ListItemTitle>
          <p>
          Maximize your savings by reviewing your subscriptions and recurring expenses. Consider automating a fixed amount into a savings account each month to build your savings effortlessly
          </p>
        </ListItem>

        <ListItem>
          <ListItemTitle>
          Goal Prioritization
          </ListItemTitle>
          <p>
          When managing multiple goals, prioritize based on necessity and deadlines. Use our 'Prioritize' feature to rearrange your goals according to their importance.
          </p>
        </ListItem>

        <ListItem>
          <ListItemTitle>
          Expense Reduction Strategies
          </ListItemTitle>
          <p>
          Reduce monthly costs by switching to less expensive alternatives for services like internet and streaming. Also, take advantage of cash-back and rewards programs whenever possible.
          </p>
        </ListItem>
      </List>
      <h1>Ask Anything</h1>
      <p>powered by GPT-3.5</p>
      <div>Enter a topic and the AI will answer your questions</div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={query} onChange={handleQueryChange} name="query" placeholder="Ask a question" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {response && <div><strong>AI Response:</strong> {response}</div>}
    </StyledDiv>
  );
}
