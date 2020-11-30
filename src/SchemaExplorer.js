import React from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

function graphQLFetcher(graphQLParams) {
  return fetch('http://localhost:8080/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams)
  })
  .then(res => res.json());
}

const SchemaExplorer = () => {
  return (
    <div style={{ height: "100vh", textAlign: "left" }}>
      <GraphiQL fetcher={graphQLFetcher} />
    </div>
  );
};

export default SchemaExplorer;