/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import GlobalStyle from '../../global-styles';
import VisualizePage from '../VisualizePage';
import UserRegister from 'containers/UserRegister';
import UserLogin from 'containers/UserLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthContext';
import { PrivateRoute, PublicRoute } from '../../components/CustomRoutes';  


const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  const { authToken } = React.useContext(AuthContext);

  return (
    <AppWrapper>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <PublicRoute exact path="/login" component={UserLogin} />
      <PublicRoute exact path="/register" component={UserRegister} />
      <PrivateRoute exact path="/home" component={HomePage} />
      <PrivateRoute exact path="/visualization" component={VisualizePage} />
      <PrivateRoute exact path="/features" component={FeaturePage} />
      <Route path="" component={NotFoundPage} />
    </Switch>


      <GlobalStyle />
    </AppWrapper>
  );
}
