import React from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import axios from 'axios';

// function graphQLFetcher(graphQLParams) {
//   return fetch(`${origin}/graphql/${satellite.id}`, {
//     method: 'POST',
//     headers: { 
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(graphQLParams)
//   })
//   .then(res => res.json());
// }

const SchemaExplorer = ({ satellite, origin }) => {
  const graphQLFetcher = (graphQLParams) => {
    return axios.post(`${origin}/graphql/${satellite.id}`, {
      withCredentials: true,
      data: graphQLParams
    })
    .then(res => res.json());
  };

  if (!satellite) {
    return (
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <p className="subtitle">
              You have no satellite to introspect.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", textAlign: "left" }}>
      <GraphiQL fetcher={graphQLFetcher} satellite={satellite} origin={origin} />
    </div>
  );
};

export default SchemaExplorer;