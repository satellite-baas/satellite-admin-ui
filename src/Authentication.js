import React, { useState } from 'react';

import Notification from './Notification';
import Login from './Login';
import Register from './Register';

const Authentication = ({ handleUserId, origin, onLogin, onSignup }) => {
  const isLoggedIn = window.location.pathname === '/login';
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleNotificationRemove = () => {
    setMessage('');
  };

  const handleNotificationUpdate = (message, success) => {
    setMessage(message);
    setSuccess(success);
  };
  console.log(origin)
  return (
    <div className="columns is-centered">
      <div className="column is-one-third vertical-center">
        <div className="box" style={{ textAlign: 'left'}}>
          <h1 className="title is-2">{
            isLoggedIn ? ('Login') : ('Register')
          }</h1>
          { message.length === 0 ? (
            null
            ) : (<Notification 
            message={message}
            success={success}
            removeNotification={handleNotificationRemove}
          />)}
          { isLoggedIn ? (
            <Login 
              onLogin={onLogin}
              handleUpdateMessage={handleNotificationUpdate}
              origin={origin}
            />
          ) : (
            <Register 
              onSignup={onSignup}
              handleUserId={handleUserId}
              handleUpdateMessage={handleNotificationUpdate}
              origin={origin}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;