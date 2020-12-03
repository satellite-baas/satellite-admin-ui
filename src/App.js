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
  domain: 'todoapp',
  endpoint: 'todoapp.localhost.com',
  apiKey: uuidv4(),
  files: true
}, {
  id: 2,
  name: 'Shopping Cart',
  domain: 'shoppingcart',
  endpoint: 'shoppingcart.localhost.com',
  apiKey: uuidv4(),
  files: false
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
        name,
        endpoint: 'random.localhost.com',
        apiKey: uuidv4(),
        files: false
      })
    });

    this.setState({
      currentSatellite: satellites[satellites.length - 1].id
    });
  };

  handleDestroySatellite = () => {
    // fetch POST to controller to tear down satellite

    const updatedSatellites = this.state.satellites.filter(satellite => satellite.id !== this.state.currentSatellite);
    const context = this;

    this.setState(
      { satellites: updatedSatellites }, 
      () => {
        if (this.state.satellites.length > 0) {
          this.setState({ currentSatellite: this.state.satellites[0].id })
        } else {
          this.setState({ currentSatellite: null });
        }
      });
  };

  render() { 
    const satellite = this.state.satellites.filter(function(sat) {
      return sat.id === this.state.currentSatellite;
    }, this)[0];

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
                <Main 
                  satellite={satellite}
                  handleDestroySatellite={this.handleDestroySatellite}
                />
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
