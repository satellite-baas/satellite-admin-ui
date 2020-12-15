import React from 'react'
import { Switch, Route } from 'react-router-dom';
import SchemaExplorer from '../schemaExplorer/SchemaExplorer';
import SchemaManager from '../schemaManager/SchemaManager';
import StaticManager from '../fileManager/StaticMananger';
import Home from './Home';

const Main = ({ 
  satellite, 
  handleDestroySatellite, 
  handleNewAPIKey,
  loading,
  done,
  clearDone
}) => {
  return (
    <div className="column is-four-fifths">
      <div className="main-container">
        <Switch>
          <Route path="/files">
            <StaticManager 
              satellite={satellite}
            />
          </Route>
          <Route path="/schema">
            <SchemaManager 
              satellite={satellite}
            />
          </Route>
          <Route path="/explorer">
            <SchemaExplorer 
              satellite={satellite}
            />
          </Route>
          <Route path="/">
            <Home 
              satellite={satellite}
              handleDestroySatellite={handleDestroySatellite}
              handleNewAPIKey={handleNewAPIKey}
              loading={loading}
              done={done}
              clearDone={clearDone}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Main;