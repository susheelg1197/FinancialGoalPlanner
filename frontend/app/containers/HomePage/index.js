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

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
      <form>
        <label>Goal Name:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Target Amount:</label>
        <input 
          type="text" 
          required 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label>Category:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="inprogress">Savings</option>
          <option value="inprogress">Healthcare</option>
          <option value="done">Retirement</option>
          <option value="done">Travel</option>
          <option value="done">Emergency</option>
        </select>
        <label>Status:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="inprogress">In-progress</option>
          <option value="done">Done</option>
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
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        
        <button>Add Goal</button>
      </form>
      <br></br>
      <hr></hr>
      <h2>Add a New Expense</h2>
      <form>
        <label>Expense Amount:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Category:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="rent">Rent</option>
          <option value="groceries">Groceries</option>
          <option value="tuition">Tuition Fee</option>
        </select>
        <button>Add Expense</button>
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
