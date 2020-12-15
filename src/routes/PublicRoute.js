import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, isLoggedIn, ...rest}) => {
    return (
      <Route 
        {...rest} 
        render={props => ( isLoggedIn ? <Redirect to="/" /> : <Component origin={rest.origin} onLogin={rest.onLogin} onSignup={rest.onSignup}/>)}        
      />
    );
};
export default PublicRoute;