import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';
import SchemaExplorer from './SchemaExplorer';
import SchemaManager from './SchemaManager.js';
import ApiManager from './ApiManager';
import Home from './Home';
import Navbar from "./Navbar";
import Header from './Header';

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
  return (
    <div className="App">
      <Router>
        <Header />
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/security">
              <ApiManager />
            </Route>
            <Route path="/schema">
              <SchemaManager />
            </Route>
            <Route path="/explorer">
              <SchemaExplorer />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
