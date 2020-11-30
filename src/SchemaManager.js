import React, { useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import { Button } from 'react-bootstrap';

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

    console.log(mutation);
    // send to Admin Application?
    // not sure exactly how we'll want to do this
  };

  render() {
    return (
      <div 
        className="container"
        style={{ textAlign: 'left' }}
      >
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
        <Button
          block
          variant="primary"
          style={{ marginTop: '5px' }}
          onClick={this.handleSubmitSchema}
        >
          Deploy
        </Button>
      </div>
    );
  }
}

export default SchemaManager;