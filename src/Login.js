import React, { useState } from 'react';
import Notification from './Notification';

const Login = ({ handleUserId, handleChooseRegister, handleUpdateMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    // make fetch to controller to determine authenticity
    const payload = {
      username,
      password
    };

    // if good, setUserId
    const user = {
      id: 1,
      username
    };

    handleUserId(1); // automatically rerenders router
    
    // if bad, render error

    // handleUpdateMessage('Incorrect credentials.', false);
  };

  return (
    <>
      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left">
          <input 
            className="input" 
            value={username}
            onChange={handleUsernameChange}
            type="text"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>

      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left">
          <input 
              className="input" 
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-key"></i>
            </span>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button 
            className="button is-info" 
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
      <a 
        href="#"
        onClick={handleChooseRegister}
      >
        Don't have an account? Register instead.
      </a>
    </>
  );
};

export default Login;