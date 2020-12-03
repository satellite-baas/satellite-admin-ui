import React, { useState } from 'react';
import FileForm from './FileForm';

class StaticManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      showUpload: false,
      loading: false,
      done: false,
      files: [],
      selectedFile: null
    };
  }

  componentDidMount() {
    // make fetch to express API for list of static files
    // assign returned json array to files in state

    // for now, static

    const items = [{
      name: 'hello.txt',
      size: 6432,
      modified: "2020-12-03T15:03:14.753Z"
    }, {
      name: "subdir/another/archlinux-2020.11.01-x86_64.iso",
      size: 1000000001,
      modified: "2020-12-03T15:01:56.447Z"
    }, {
      name: 'subdir/dome.jpg',
      size: 1944445,
      modifed: "2020-12-03T15:02:29.818Z"
    }];

    this.setState({ files: items });
  }

  handleOpenModal = (name) => {
    this.setState({
      selectedFile: name
    });
  };

  getSize = (size) => {
    let updatedSize;

    if (size < 1000) {
      return `< 1KB`;
    } else if (size > 1000000000) { 
      updatedSize = Math.round(size / 1000000000 * 10) / 10;
      return `${updatedSize}GB`
    } else if (size > 1000000) {
      updatedSize = Math.round(size / 1000000 * 10) / 10;
      return `${updatedSize}MB`;
    } else {
      return `${Math.round(size / 1000 * 10) / 10}KB`;
    }
  };

  handleUploadClick = () => {
    this.setState({
      showUpload: true
    });


  };

  handleUpload = (file) => {
    // make fetch request to POST file

    /*

    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: this.state.fileToUpload
    })
    .then(res => res.json())
    .then(json => {
      // attach to state
      // give confirmation
      // allow to close out of modal
    })
    .catch(err => {
      // give error
      // allow close out of modal
    })

    */
   const newFile = {
      name: file.name,
      modified: file.lastModifiedDate,
      size: file.size
    };

    this.setState({
      loading: true
    }, () => {
      // fetch request, we will simulate for now
      setTimeout(() => {
        this.setState({
          files: this.state.files.concat(newFile)
        }, () => {
          this.setState({
            loading: false,
            showUpload: false,
            done: {
              type: 'success',
              msg: 'File uploaded successfully.'
            }
          });
        });
      }, 2000)
    });
  };

  handleUploadDone = () => {
    this.setState({
      showUpload: false
    });
  };

  closeNotification = () => {
    this.setState({
      done: null
    });
  };

  handleCloseDeleteModal = () => {
    this.setState({ show: false });
  };

  handleOpenDeleteModal = (name) => {
    this.setState({ show: true, selectedFile: name });
  };

  handleConfirmDelete = () => {
    // fetch POST to delete the file, now static
    this.setState({
      files: this.state.files.filter(file => file.name !== this.state.selectedFile)
    }, () => {
      this.setState({ selectedFile: null });
      this.handleCloseDeleteModal();
    })
  };

  render() { 
    return (
      <div className="columns is-centered">
        <div className={`modal ${this.state.showUpload ? "is-active" : ""}`}>
          <div className="modal-background">
            <div id="centered-modal" className="modal-card">
              <header className="modal-card-head">
                File Upload
              </header>
              <section className="modal-card-body">
                <FileForm 
                  handleUpload={this.handleUpload}
                  loading={this.state.loading}
                />
              </section>
            </div>
          </div>
        </div>
        <div className={`modal ${this.state.show ? "is-active" : ""}`}>
          <div className="modal-background">
            <div id="centered-modal" className="modal-card">
              <header className="modal-card-head">
                Delete File
              </header>
              <section className="modal-card-body">
                <p className="subtitle">Are you sure you want to delete this file? This action is irreversible.</p>
              </section>
              <footer className="modal-card-foot">
                <button 
                  className="button is-danger" 
                  onClick={this.handleConfirmDelete}
                >Delete File</button>
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
                <button class="delete" onClick={this.closeNotification}></button>
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
                {
                  this.state.files.map(function(file) {
                    return (
                      <tr>
                        <td>{file.name}</td>
                        <td>{this.getSize(file.size)}</td>
                        <td>{new Date(file.modified).toDateString()}</td>
                        <td>
                          <span 
                            className="icon delete-backend"
                            onClick={() => this.handleOpenDeleteModal(file.name)}
                          >
                            <i 
                              className="fas fa-trash-alt"
                            ></i>
                          </span>
                        </td>
                      </tr>
                    );
                  }, this)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default StaticManager;