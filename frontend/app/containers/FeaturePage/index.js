/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';

const StyledDiv = styled.div`
  padding: 20px;
  background-color: #f4f4f8;
`;

export default function FeaturePage() {
  return (
    <StyledDiv>
      <Helmet>
        <title>Feature Page</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>
        Help Center
      </H1>
      <p>
      Welcome to the Help Center of Financial Goal Planner! Here, you will find all the resources needed to navigate and maximize the benefits of our app. Whether you're setting your first financial goal or looking to better manage your finances, our detailed guides and tips are here to assist you every step of the way.
     </p>
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
      </StyledDiv>
  );
}
