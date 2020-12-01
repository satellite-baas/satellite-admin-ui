import React, { useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';

class SchemaManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schema: '# Insert schema here.'
    };
  }

  componentDidMount() {
    // retrieve actual schema from Dgraph

    const query = `
      {
        getGQLSchema {
          schema
        }
      }
    `;

    fetch('http://localhost:8080/admin', {
      method: 'POST',
      headers: { 
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
    .then(res => res.json())
    .then(json => {
      setTimeout(() => {
        this.handleUpdateSchema(json.data.getGQLSchema.schema);
      }, 3000);
    })
    .catch(err => {
      this.handleSubmitSchema('Could not load schema from backend.');
    });
  }

  handleUpdateSchema = (schema) => {
    this.setState({ schema });
  };

  handleSubmitSchema = () => {
    const mutation = `
    {
      updateGQLSchema(
        input: { set: { schema: "${this.state.schema}"}}
      ) {
        gqlSchema {
          schema
          generatedSchema
        }
      }
    }
    `;

    // send to Admin Application?
    // not sure exactly how we'll want to do this
  };

  render() {
    return (
      <div 
        style={{ textAlign: 'left' }}
      >
        <h1 className="title is-2">Schema</h1>
        <div className="box schema-box">
          <CodeMirror 
            value={this.state.schema}
            options={{
              mode: 'graphql',
              theme: 'material',
              lineNumbers: true,
              tabSize: 2
            }}
            onChange={(editor, data, value) => this.handleUpdateSchema(value)}
          />
          <button
            className="button is-info is-fullwidth mt-2"
            onClick={this.handleSubmitSchema}
          >
            Deploy
          </button>
        </div>
      </div>
    );
  }
}

export default SchemaManager;