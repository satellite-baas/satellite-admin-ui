import React, { useState } from 'react';
import Notification from './Notification';

const Register = ({ handleChooseLogin, handleUpdateMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePWConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = () => {
    // check params for validity
    if (password.trim().length < password.length || username.trim().length < username.length) {
      handleUpdateMessage('Credentials can not contain spaces.', false);
      return;
    }

    if (password !== passwordConfirmation) {
      handleUpdateMessage('Passwords do not match.', false);
      return;
    }

    if (password.length < 8) {
      handleUpdateMessage('Password must be at least 8 characters.', false);
      return; 
    }

    // make fetch to controller to determine authenticity
    const payload = {
      username,
      password,
      passwordConfirmation
    };

    // if good, go to Login and set success notification
    handleUpdateMessage('Successfully registered.', true);
    handleChooseLogin();
    

    // if bad, render error
    
    // handleUpdateMessage('Unable to register.', false);
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
        <label className="label">Password Confirmation</label>
        <div className="control has-icons-left">
          <input 
              className="input" 
              value={passwordConfirmation}
              onChange={handlePWConfirmationChange}
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
            Register
          </button>
        </div>
      </div>
      <a 
        href="#"
        onClick={handleChooseLogin}
      >
        Already have an account? Login instead.
      </a>    
    </>
  );
};

export default Register;