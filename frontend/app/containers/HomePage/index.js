/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import './HomePage.css'; 
import { useState } from "react";
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import Button from '../../components/Button';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import moneyImage from './money1.png';
const key = 'home';

export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currentamount, setCurrentAmount] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('inprogress');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [category, setCategory] = useState('travel')

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action
    console.log(`Expense Amount: ${expenseAmount}, Category: ${category}`);
    // Add here any logic to process or store the expense data
    setExpenseAmount('');
    setCategory('');
};

const handleSubmitgoal = async (e) => {
  e.preventDefault(); // Prevent the default form submit action

  const goalData = {
    category: category,
    currentAmount: currentamount,
    description: description,
    endDate: endDate,
    name: name,
    startDate: startDate,
    targetAmount: amount
  };

  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNDc5Nzg0MCwianRpIjoiNDdhZGVlNzktZGFhYi00MTY4LWJkOTgtMDA3NThmNTFjZmJjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1c2VybmFtZSI6InNocmV5YSIsInVzZXJJZCI6MX0sIm5iZiI6MTcxNDc5Nzg0MCwiY3NyZiI6IjhlMjU0ODExLTc1N2MtNDU5OS05ZmEwLTZjNDdjN2FjNWJlOCIsImV4cCI6MTcxNDc5ODc0MH0.f9E_lKFejPeNlM0A6SfldMOYy52u-LOS_d1n20yhI7I";
    const response = await fetch('http://localhost:8000/api/v1/financial_goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(goalData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    console.log('Goal created:', data);
    
    // Add any logic to update UI or handle success here

    // Reset form fields
    setName('');
    setDescription('');
    setAmount('');
    setCategory('savings');
    setStatus('inprogress');
    setStartDate('');
    setEndDate('');
  } catch (error) {
    console.error('Error creating goal:', error);
    // Add logic to handle error and show user feedback if needed
  }
};


  return (
    <article className="homePageBackground">
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <section class="hero">
      <div class="hero-container">
        <div>
        <div class="column-left">
          <h1>Take Control of Your Finances</h1>
          <h4>
          Start your journey to financial freedom with Financial Goal Planner! This tool is designed to help you understand where your money goes, set realistic financial goals, and develop a plan to reach them.
          </h4>
          <p></p>
          <h4> </h4>
          
        
          
        </div>
        <div class="column-right">
          <img
            src={moneyImage}
            alt="illustration"
            class="hero-image"
            style={{ width: '300px', height: '300px' , borderRadius: '300px' }}
          />
        </div>
        </div>
       
        <div className="create">
      <h2>Add a New Goal</h2>
      <form onSubmit={handleSubmitgoal}>
        <label>Goal Name:</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Target Amount:</label>
        <input 
          type="text" 
          required 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label>Current Amount:</label>
        <input 
          type="text" 
          required 
          value={currentamount}
          onChange={(e) => setCurrentAmount(e.target.value)}
        />
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="savings">Savings</option>
          <option value="healthcare">Healthcare</option>
          <option value="retirement">Retirement</option>
          <option value="travel">Travel</option>
          <option value="emergency">Emergency</option>
        </select>
        
        <label>Start Date:</label>
          
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
          <label>End Date:</label>
          
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        
        <button>Add Goal</button>
      </form>
      <br></br>
      <hr></hr>
      <h2>Add a New Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>Expense Amount:</label>
        <input 
          type="text" 
          required 
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="rent">Rent</option>
          <option value="groceries">Groceries</option>
          <option value="tuition">Tuition Fee</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </div>
      </div>
    </section>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
