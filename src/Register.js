import React, { useState } from 'react';
import Notification from './Notification';
import { Link } from 'react-router-dom';

const Register = ({ 
  onSignup, 
  handleUpdateMessage, 
  origin
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePWConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = () => {
    // actual value will be window location origin
    const params = {
      email, 
      password
    };
    
    console.log(`${origin}/signup`)
    fetch(`${origin}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(json => {
      if (json.error) {
        handleUpdateMessage(json.error, false);
        return;
      }

      handleUpdateMessage('Successfully registered.', true);
      
      setTimeout(() => {
        onSignup();
      }, 1000);
    })
    .catch(err => {
      console.log(err);
    });

    // check params for validity
    // if (password.trim().length < password.length || username.trim().length < username.length) {
    //   handleUpdateMessage('Credentials can not contain spaces.', false);
    //   return;
    // }

    // if (password !== passwordConfirmation) {
    //   handleUpdateMessage('Passwords do not match.', false);
    //   return;
    // }

    // if (password.length < 8) {
    //   handleUpdateMessage('Password must be at least 8 characters.', false);
    //   return; 
    // }

    // // make fetch to controller to determine authenticity
    // const payload = {
    //   username,
    //   password,
    //   passwordConfirmation
    // };

    // if good, go to Login and set success notification
    
    

    // if bad, render error
    
    // handleUpdateMessage('Unable to register.', false);
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
      <Link
        to="/login"
      >
        Already have an account? Login instead.
      </Link>  
    </>
  );
};

export default Register;