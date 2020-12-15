import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Notification from './Notification';

const Login = ({ 
  onLogin,  
  handleUpdateMessage, 
  origin 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const params = {
      email,
      password
    };

    fetch(`${origin}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(res => {
      if (res.status >= 400) {
        handleUpdateMessage('Could not login.', false);
        return;
      }

      onLogin();
    })
    .catch(err => {
      handleUpdateMessage('Could not perform login. Check with administrator.', false);
    });
    
    // if bad, render error

    // handleUpdateMessage('Incorrect credentials.', false);
  };

  return (
    <>
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left">
          <input 
            className="input" 
            value={email}
            onChange={handleEmailChange}
            type="text"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-email"></i>
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
      <Link
        to="/register"
      >
        Don't have an account? Register instead.
      </Link>
    </>
  );
};

export default Login;