import axios from "axios";
import React from "react";
import FileForm from "./FileForm";

const condenseName = (name) => {
  return name.split(" ").join("_").toLowerCase();
};

class StaticManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      showUpload: false,
      loading: false,
      done: false,
      files: [],
      selectedFile: null,
    };
  }

  componentDidMount() {
    if (this.props.satellite) {
      axios
        .get(`${this.props.origin}/files/${this.props.satellite.id}`)
        .then((json) => {
          console.log(json);
          this.setState({
            files: json.data,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            done: {
              type: "danger",
              msg: "Could not fetch files. Contact an administrator.",
            },
          });
        });

      return;
    }

    this.setState({
      done: {
        type: "danger",
        msg: "No files to fetch for non-existent backend.",
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.satellite || !this.props.satellite) return;

    if (prevProps.satellite.id !== this.props.satellite.id) {
      axios
        .get(`${this.props.origin}/files/${this.props.satellite.id}`)
        .then((json) => {
          console.log(json);
          this.setState({
            files: json.data,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            done: {
              type: "danger",
              msg: "Could not fetch files. Contact an administrator.",
            },
          });
        });
    }
  }

  handleOpenModal = (name) => {
    this.setState({
      selectedFile: name,
    });
  };

  getSize = (size) => {
    let updatedSize;

    if (size < 1000) {
      return `< 1KB`;
    } else if (size > 1000000000) {
      updatedSize = Math.round((size / 1000000000) * 10) / 10;
      return `${updatedSize}GB`;
    } else if (size > 1000000) {
      updatedSize = Math.round((size / 1000000) * 10) / 10;
      return `${updatedSize}MB`;
    } else {
      return `${Math.round((size / 1000) * 10) / 10}KB`;
    }
  };

  handleUploadClick = () => {
    if (!this.props.satellite) {
      return;
    }
    
    this.setState({
      showUpload: true,
    });
  };

  handleUpload = (file) => {
    if (!this.props.satellite) {
      return;
    }
    
    const context = this;
    const data = new FormData();
    const fileInput = document.querySelector("#file_upload");

    data.append("file", fileInput.files[0]);
    data.append("id", this.props.satellite.id);

    axios
      .post(`${this.props.origin}/upload`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);

        const newFile = {
          name: file.name,
          modified: new Date(),
          size: file.size,
        };

        console.log(newFile);

        this.setState(
          {
            files: context.state.files.concat(newFile),
          },
          () => {
            context.setState({
              loading: false,
              showUpload: false,
              done: {
                type: "success",
                msg: "File uploaded successfully.",
              },
            });
          }
        );
      })
      .catch((err) => {
        console.log(err);

        this.setState({
          loading: false,
          showUpload: false,
          done: {
            type: "danger",
            msg: "Could not upload file. Make sure it is under 1GB.",
          },
        });
      });

    // fetch(`http://localhost:3030/upload`, {
    //   method: 'POST',
    //   body: data
    // })
    // .then(res => {
    //   const newFile = {
    //     name: file.name,
    //     modified: new Date(),
    //     size: file.size
    //   };
    //   console.log(newFile)
    //   this.setState({
    //     files: context.state.files.concat(newFile)
    //   }, () => {
    //     context.setState({
    //       loading: false,
    //       showUpload: false,
    //       done: {
    //         type: 'success',
    //         msg: 'File uploaded successfully.'
    //       }
    //     });
    //   });
    // })
    // .catch(err => {
    //   context.setState({
    //     loading: false,
    //     showUpload: false,
    //     done: {
    //       type: 'danger',
    //       msg: 'Could not upload file. Make sure it is under 1GB.'
    //     }
    //   });
    // });
  };

  handleUploadDone = () => {
    this.setState({
      showUpload: false,
    });
  };

  closeNotification = () => {
    this.setState({
      done: null,
    });
  };

  handleCloseDeleteModal = () => {
    this.setState({ show: false });
  };

  handleOpenDeleteModal = (name) => {
    this.setState({ show: true, selectedFile: name });
  };

  handleConfirmDelete = () => {
    const context = this;

    axios
      .delete(`${this.state.origin}/file`, {
        data: { fileName: this.state.selectedFile },
      })
      .then((res) => {
        console.log(res);

        this.setState(
          {
            files: context.state.files.filter(
              (file) => file.name !== context.state.selectedFile
            ),
          },
          () => {
            context.setState({
              done: {
                type: "success",
                msg: "File successfully deleted.",
              },
              show: false,
              selectedFile: null,
            });
          }
        );
      })
      .catch((err) => {
        console.log(err);

        this.setState({
          done: {
            type: "danger",
            msg: "Could not delete the selected file.",
          },
          show: false,
          selectedFile: null,
        });
      });

    // fetch(`http://localhost:3030/file`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ fileName: this.state.selectedFile })
    // })
    // .then(res => {
    //   context.setState({
    //     files: context.state.files.filter(file => file.name !== context.state.selectedFile)
    //   }, () => {
    //     context.setState({
    //       done: {
    //         type: 'success',
    //         msg: 'File successfully deleted.'
    //       },
    //       show: false,
    //       selectedFile: null
    //     });
    //   });
    // })
    // .catch(err => {
    //   context.setState({
    //     done: {
    //       type: 'danger',
    //       msg: 'Could not delete the selected file.'
    //     },
    //     show: false,
    //     selectedFile: null
    //   });
    // });
  };

  render() {
    return (
      <div className="columns is-centered">
        <div className={`modal ${this.state.showUpload ? "is-active" : ""}`}>
          <div className="modal-background">
            <div id="centered-modal" className="modal-card">
              <header className="modal-card-head">File Upload</header>
              <section className="modal-card-body">
                <FileForm
                  handleUpload={this.handleUpload}
                  loading={this.state.loading}
                />
              </section>
            </div>
            <button
              className="modal-close is-large"
              onClick={this.handleUploadDone}
            ></button>
          </div>
        </div>
        <div className={`modal ${this.state.show ? "is-active" : ""}`}>
          <div className="modal-background">
            <div id="centered-modal" className="modal-card">
              <header className="modal-card-head">Delete File</header>
              <section className="modal-card-body">
                <p className="subtitle">
                  Are you sure you want to delete this file? This action is
                  irreversible.
                </p>
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-danger"
                  onClick={this.handleConfirmDelete}
                >
                  Delete File
                </button>
                <button
                  className="button"
                  onClick={this.handleCloseDeleteModal}
                >
                  Cancel
                </button>
              </footer>
            </div>
            <button
              className="modal-close is-large"
              onClick={this.handleCloseDeleteModal}
            ></button>
          </div>
        </div>
        <div className="column is-three-quarters has-text-left">
          <h1 className="title is-2">Static File Manager</h1>
          <div className="box">
            <button
              className="button is-fullwidth is-info"
              onClick={this.handleUploadClick}
            >
              Upload File
            </button>
            {this.state.done && (
              <div className={`mt-3 notification is-${this.state.done.type}`}>
                <button
                  className="delete"
                  onClick={this.closeNotification}
                ></button>
                {this.state.done.msg}
              </div>
            )}
          </div>
          <div className="box">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Last Modified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.files.map(function (file) {
                  return (
                    <tr>
                      <td>{file.name}</td>
                      <td>{this.getSize(file.size)}</td>
                      <td>{new Date(file.modified).toDateString()}</td>
                      <td>
                        <span
                          className="icon delete-backend ml-2"
                          onClick={() => this.handleOpenDeleteModal(file.name)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </span>
                      </td>
                    </tr>
                  );
                }, this)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default StaticManager;
