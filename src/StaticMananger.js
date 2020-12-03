import React, { useState } from 'react';

const StaticManager = ({ satellite }) => {
  return (
    <div className="columns is-centered">
      <div className="column is-three-quarters has-text-left">
        <h1 className="title is-2">Static File Manager</h1>
        <div className="box">
          <p className="subtitle is-4">
            {satellite.files ? (
              'This satellite already has static files served for it.') : (
              'This satellite does not have any static files served for it.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaticManager;