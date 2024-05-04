// src/components/CustomRoutes.js

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; // Adjust the path as necessary

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authToken } = useContext(AuthContext);
  return (
    <Route {...rest} render={props => (
      authToken ? <Component {...props} /> : <Redirect to="/login" />
    )} />
  );
};

export const PublicRoute = ({ component: Component, ...rest }) => {
  const { authToken } = useContext(AuthContext);
  return (
    <Route {...rest} render={props => (
      !authToken ? <Component {...props} /> : <Redirect to="/home" />
    )} />
  );
};
