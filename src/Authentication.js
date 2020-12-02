import React, { useState } from 'react';

import Notification from './Notification';
import Login from './Login';
import Register from './Register';

const Authentication = ({ handleUserId }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChooseRegister = () => {
    setIsLogin(false);
  };

  const handleChooseLogin = () => {
    setIsLogin(true);
  };

  const handleNotificationRemove = () => {
    setMessage('');
  };

  const handleNotificationUpdate = (message, success) => {
    setMessage(message);
    setSuccess(success);
  };

  return (
    <div className="columns is-centered">
      <div className="column is-one-third vertical-center">
        <div className="box" style={{ textAlign: 'left'}}>
          <h1 className="title is-2">{
            isLogin ? ('Login') : ('Register')
          }</h1>
          { message.length === 0 ? (
            null
            ) : (<Notification 
            message={message}
            success={success}
            removeNotification={handleNotificationRemove}
          />)}
          { isLogin ? (
            <Login 
              handleUserId={handleUserId}
              handleChooseRegister={handleChooseRegister}
              handleUpdateMessage={handleNotificationUpdate}
            />
          ) : (
            <Register 
              handleChooseLogin={handleChooseLogin}
              handleUpdateMessage={handleNotificationUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;