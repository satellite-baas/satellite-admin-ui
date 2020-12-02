import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SchemaExplorer from './SchemaExplorer';
import SchemaManager from './SchemaManager.js';
import ApiManager from './ApiManager';
import Home from './Home';

const Main = ({ satellite, handleDestroySatellite }) => {
  return (
    <div className="main-container">
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
          <Home 
            satellite={satellite}
            handleDestroySatellite={handleDestroySatellite}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;