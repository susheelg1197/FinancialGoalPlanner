/**
 *
 * VisualizePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import BarChart from './Barchart';
import RadialBarChart from './RadialBarChart';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectVisualizePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import YearDropdown from './YearDropdown';
import GoalList from './GoalList';
import './visualize.css';
import messages from './messages'; 
import ExpensesList from './ExpensesList';
import FinancesList from './FinancesList';
import YearlyExpenseChart from './YearlyExpenseChart';
import ExpensesSpiral from './ExpensesSpiral';
import YearlyFinancesChart from './YearlyFinancesChart';
import CombinationChart from './CombinationChart';
import FinancialGoalChart from './FinancialGoalChart';
import FinancialGoalParent from './FinancialGoalParent';
const StyledDiv = styled.div`
  padding: 20px;
`;
export function VisualizePage() {
  useInjectReducer({ key: 'visualizePage', reducer });
  useInjectSaga({ key: 'visualizePage', saga });

  // const expenses = [1200, 1100, 1250, 1000, 1050, 950, 1150, 1200, 1100, 1300, 900, 950];
  // const savings = [1500, 1600, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000];

  // // Sample target amount for the year
  // const targetAmount = 24000; // This implies a goal to reach $24,000 in savings for the year


  return (
    <StyledDiv>
      <Helmet>
        <title>VisualizePage</title>
        <meta name="description" content="Description of VisualizePage" />
      </Helmet>
      <h1> Welcome to Your Spending Dashboard</h1>
      Gain insights into your financial habits with our interactive Spending Dashboard. Explore your spending patterns, track where your money goes each month, and discover opportunities to save more effectively.
    
      <div class="row">
        <div class="column">
          <div class="heading">
            <h2>Yearly Expenditure</h2>
            <YearDropdown/>
          </div>
          <YearlyExpenseChart />
        </div>
        <div class="column">
          <div class="heading">
            <h2>Yearly Finances</h2>
            <YearDropdown/>
          </div>
          <YearlyFinancesChart />
        </div>
        <div class="column">
          <h2>Category Expenditure of this month</h2>
          <ExpensesSpiral /> 
        </div>
        <div class="column">
          <h2>My Goals</h2>
           <GoalList/>
        </div>
        <div class="column">
          <h2>My Expenses</h2>
           <ExpensesList/>
        </div>
        <div class="column">
          <h2>My Finances</h2>
           <FinancesList/>
        </div>
        <div class="column">
          <h2>Monthly Expense vs Savings Chart</h2>
          <FinancialGoalParent/>
        </div>
        {/* <div class="column">
          <div class="heading">
            <h2>Monthly Expenditure</h2>
            <YearDropdown/>
          </div>
          <BarChart />
        </div> */}
      </div>
    </StyledDiv>
  );
}

VisualizePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  visualizePage: makeSelectVisualizePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(VisualizePage);
