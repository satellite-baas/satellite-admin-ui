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
      schema: '# Loading schema...',
      notification: null
    };
  }

  componentDidMount() {
    // retrieve actual schema from Dgraph
    const context = this;
    const query = `
      {
        getGQLSchema {
          schema
        }
      }
    `;

    fetch(`http://localhost:3030/admin`, {
      method: 'POST',
      headers: { 
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
    .then(res => res.json())
    .then(json => {
      setTimeout(() => {
        context.handleUpdateSchema(json.data.getGQLSchema.schema);
      }, 1000);
    })
    .catch(err => {
      context.handleUpdateSchema('# Could not load schema from backend.');
    });
  }

  handleUpdateSchema = (schema) => {
    this.setState({ schema });
  };

  handleSubmitSchema = () => {
    const context = this;
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

    this.setState({
      notification: {
        type: 'light',
        msg: 'Updating schema...'
      }
    });

    fetch(`http://localhost:3030/admin/schema`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-binary'
      },
      body: this.state.schema
    })
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.errors) {
        this.setState({
          notification: {
            type: 'danger',
            msg: 'There is an issue with the schema. Could not update.'
          }
        });
      
        return;
      } 

      this.setState({ notification: {
        type: 'success',
        msg: 'Schema successfully updated.'
      }});
    })
    .catch(err => {
      this.handleUpdateSchema('# Could not update schema.');
      context.setState({ 
        notification: {
          type: 'danger',
          msg: 'Could not update schema due to connection error.'
        }
      });
    });
  };

  handleCloseDelete = () => {
    this.setState({ notification: null });
  };

  render() {
    return (
      <div style={{ textAlign: 'left' }}>
        <h1 className="title is-2">Schema</h1>
        {this.state.notification &&         
          <div className={`mb-3 notification is-${this.state.notification.type}`}>
            <button className="delete" onClick={this.handleCloseDelete}></button>
            {this.state.notification.msg}
          </div>
        }
        <div className="box" style={{ padding: "2rem" }}>
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