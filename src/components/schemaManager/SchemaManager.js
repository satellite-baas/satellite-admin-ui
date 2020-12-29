import React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/lint/lint";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/mode";
import axios from "axios";
import FileForm from "../fileManager/FileForm";

class SchemaManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schema: "# Loading schema...",
      notification: null,
      file: null,
    };
  }

  componentDidMount() {
    if (this.props.satellite) {
      this.handleGetSchema();
      return;
    }

    this.handleUpdateSchema("# Create a backend to upload schema.");
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.satellite || !this.props.satellite) return;

    if (prevProps.satellite.id !== this.props.satellite.id) {
      this.handleGetSchema();
      return;
    }
  }

  handleGetSchema = () => {
    const query = `
      {
        getGQLSchema {
          schema
        }
      }
    `;

    return fetch(`${this.props.origin}/admin/${this.props.satellite.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.handleUpdateSchema(json.data.getGQLSchema.schema);
      })
      .catch((err) => {
        console.log(err);
        this.handleUpdateSchema("# Could not load schema from backend.");
      });
  };

  handleUpdateSchema = (schema) => {
    this.setState({ schema });
  };

  handleSubmitSchema = () => {
    if (!this.props.satellite) {
      this.setState({
        notification: {
          type: "danger",
          msg: "Cannot update schema of non-existent backend.",
        },
      });

      return;
    }

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

    const context = this;
    const data = new FormData();
    const fileInput = document.querySelector("#file_upload");

    data.append("file", fileInput.files[0]);
    data.append("id", this.props.satellite.id);

    this.setState(
      {
        notification: {
          type: "light",
          msg: "Updating schema...",
        },
      },
      () => {
        axios
          .post(`${this.props.origin}/admin/schema`, data, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              this.setState({
                notification: {
                  type: "success",
                  msg: "Schema successfully updated.",
                },

                file: null,
              });

              this.handleGetSchema();
              return;
            }
          })
          .catch((err) => {
            console.log(err);
            this.handleUpdateSchema("# Could not update schema.");
            this.setState({
              file: null,
              notification: {
                type: "danger",
                msg: "Could not update schema due to connection error.",
              },
            });
          });
      }
    );

    // fetch(`http://localhost:3030/admin/schema`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-binary'
    //   },
    //   body: this.state.schema
    // })
    // .then(res => {
    //   return res.json();
    // })
    // .then(json => {
    //   if (json.errors) {
    //     this.setState({
    //       notification: {
    //         type: 'danger',
    //         msg: 'There is an issue with the schema. Could not update.'
    //       }
    //     });

    //     return;
    //   }

    //   this.setState({ notification: {
    //     type: 'success',
    //     msg: 'Schema successfully updated.'
    //   }});
    // })
    // .catch(err => {
    //   this.handleUpdateSchema('# Could not update schema.');
    //   context.setState({
    //     notification: {
    //       type: 'danger',
    //       msg: 'Could not update schema due to connection error.'
    //     }
    //   });
    // });
  };

  handleCloseDelete = () => {
    this.setState({ notification: null });
  };

  handleFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  render() {
    return (
      <div style={{ textAlign: "left" }}>
        <h1 className="title is-2">Schema</h1>
        {this.state.notification && (
          <div
            className={`mb-3 notification is-${this.state.notification.type}`}
          >
            <button
              className="delete"
              onClick={this.handleCloseDelete}
            ></button>
            {this.state.notification.msg}
          </div>
        )}
        <div className="box" style={{ padding: "2rem" }}>
          <CodeMirror
            value={this.state.schema}
            options={{
              mode: "graphql",
              theme: "material",
              lineNumbers: true,
              tabSize: 2,
            }}
            onChange={(editor, data, value) => this.handleUpdateSchema(value)}
          />
          <div className="mt-3">
            <div className="file mb-2">
              <label className="file-label">
                <input
                  className="file-input"
                  id="file_upload"
                  type="file"
                  onChange={this.handleFileChange}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Choose a file...</span>
                </span>
                <span
                  className={`${
                    this.state.file ? "is-active" : "is-hidden"
                  } file-name`}
                >
                  {this.state.file && this.state.file.name}
                </span>
              </label>
              <button
                className="button is-info ml-2"
                onClick={this.handleSubmitSchema}
              >
                Update Schema
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SchemaManager;
