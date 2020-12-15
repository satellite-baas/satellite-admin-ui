import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';

const PublicRoute = ({component: Component, isLoggedIn, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => {
          return ( 
            isLoggedIn ? <Redirect to="/" /> 
            : 
            <Component origin={rest.origin} onLogin={rest.onLogin} onSignup={rest.onSignup} />
          )          
      }} />
    );
};
export default PublicRoute;