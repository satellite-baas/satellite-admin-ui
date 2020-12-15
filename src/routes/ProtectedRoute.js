import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, isLoggedIn, ...rest}) => {
    return (
      <Route 
          {...rest} 
          render={props => ( isLoggedIn ? <Component {...rest} /> : <Redirect to="/login" />)} 
      />
    );
};
export default ProtectedRoute;