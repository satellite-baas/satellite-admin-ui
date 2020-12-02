import React, { useState } from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';
import Navbar from "./Navbar";
import Header from './Header';
import Main from './Main';
import Authentication from './Authentication';

import './App.css';
import 'bulma/css/bulma.css';

// state for schema, and api keys

const keys = [{
  code: uuidv4(),
  admin: true
}, {
  code: uuidv4(),
  admin: false
}, {
  code: uuidv4(),
  admin: true
}];

const schema = "";

// schema is fetched on route load of schema
// keys are fetched on route load of api

const App = () => {
  const [currentSatellite, setCurrentSatellite] = useState({});
  const [userId, setUserId] = useState(null);

  const handleUserId = (id) => {
    setUserId(id);
  };

  return (
    <div className="App">
      { userId ? (
        <Router>
          <Header />
          <div className="columns is-fullheight is-gapless">
            <div className="column is-one-fifth nav-container">
              <Navbar />
            </div>          
            <div className="column is-four-fifths">
              <Main />
            </div>          
          </div>
        </Router>
      ) : (
        <Authentication 
          handleUserId={handleUserId}
        />
      )}    
    </div>
  );
};

export default App;
