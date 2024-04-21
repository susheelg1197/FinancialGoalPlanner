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
const StyledDiv = styled.div`
  padding: 20px;
`;
export function VisualizePage() {
  useInjectReducer({ key: 'visualizePage', reducer });
  useInjectSaga({ key: 'visualizePage', saga });

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
          <BarChart />
        </div>
        <div class="column">
          <h2>Category Expenditure of this month</h2>
          <RadialBarChart /> 
        </div>
        <div class="column">
          <h2>Your Goals for the month</h2>
           <GoalList/>
        </div>
        <div class="column">
          <div class="heading">
            <h2>Monthly Expenditure</h2>
            <YearDropdown/>
          </div>
          <BarChart />
        </div>
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
