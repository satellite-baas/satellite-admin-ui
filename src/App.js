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
const satellites = [{
  id: 1,
  name: 'Todo App',
  domain: 'todoapp'
}, {
  id: 2,
  name: 'Shopping Cart',
  domain: 'shoppingcart'
}];

// schema is fetched on route load of schema
// keys are fetched on route load of api

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSatellite: null,
      satellites: [],
      userId: null
    };
  }

  componentDidMount() {
    // make fetch call to controller to get all satellites for
    // current user with id

    // set current satellite to the first
    // set satellites to the returned array

    // for now we'll use static state
    this.setState({
      satellites,
      currentSatellite: 1
    });
  }

  handleUserId = (id) => {
    this.setState({ userId: id });
  };

  handleSelectedSatelliteChange = (id) => {
    this.setState({ currentSatellite: id });
  };

  handleLogout = () => {
    this.setState({
      userId: null
    });
  };

  handleNewSatellite = (name) => {
    // fetch POST to controller with new satellite
    this.setState({
      satellites: satellites.concat({
        id: 3,
        name
      })
    });

    this.setState({
      currentSatellite: satellites[satellites.length - 1]
    });
  };

  render() { 
    return (
      <div className="App">
        { this.state.userId ? (
          <Router>
            <Header 
              satellites={this.state.satellites}
              currentSatellite={this.state.currentSatellite}
              changeSatellite={this.handleSelectedSatelliteChange}
              handleNewSatellite={this.handleNewSatellite}
              handleLogout={this.handleLogout}
            />
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
            handleUserId={this.handleUserId}
          />
        )}    
      </div>
    );
  }
};

export default App;
