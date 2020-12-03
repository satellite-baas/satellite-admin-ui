import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      healthy: false,
      uptime: 0,
      intervalID: null,
      show: false,
      staticVisible: false,
      apiVisible: false,
      endpointVisible: false
    };
  }

  componentDidMount() {
    this.healthCheck();

    const intervalID = setInterval(() => {
      this.healthCheck();
    }, 30000);

    this.setState({ intervalID });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  healthCheck = () => {
    const context = this;
    const query = `
      {
        health {
          instance
          status
          uptime
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
      const alpha = json.data.health[json.data.health.length - 1];

      context.setState({
        healthy: alpha.status === 'healthy',
        uptime: alpha.uptime
      });
    })
    .catch(err => {
      context.setState({
        healthy: false,
        uptime: 0
      });
    })
  };

  handleOpenModal = () => {
    this.setState({ show: true });
  };

  handleCloseModal = () => {
    this.setState({ show: false });
  };

  handleConfirmDestroy = () => {
    this.props.handleDestroySatellite();
    this.handleCloseModal();
  };

  handleShowField = (field) => {

  };

  render() { 
    const { satellite } = this.props;

    return (
      <>
        { satellite ? (
          <>
            <div className="columns is-centered is-multiline">
              <div className={`modal ${this.state.show ? "is-active" : ""}`}>
                <div className="modal-background">
                  <div id="centered-modal" className="modal-card">
                    <header className="modal-card-head">
                      Destroy Satellite
                    </header>
                    <section className="modal-card-body">
                      <p className="subtitle">Are you sure you want to delete this Satellite? This action is irreversible.</p>
                    </section>
                    <footer className="modal-card-foot">
                      <button 
                        className="button is-danger" 
                        onClick={this.handleConfirmDestroy}
                      >Destroy Satellite</button>
                      <button 
                        className="button" 
                        onClick={this.handleCloseModal}
                      >
                        Cancel
                      </button>
                    </footer>
                  </div>
                  <button
                    className="modal-close is-large"
                    onClick={this.handleCloseModal}
                  ></button>
                </div>
              </div>
              <div className="column is-three-quarters">
                <h1 className="title is-2 has-text-left">
                  {satellite.name}
                  <span 
                    className={`tag ${this.state.healthy ? 'is-success' : 'is-danger'} ml-4 health-tag is-medium`}
                  >
                    {this.state.healthy ? 'Healthy' : 'Down'}
                  </span>
                </h1>
                <div className="box has-text-left">
                  <h1 className="title is-4 mb-6">Endpoint</h1>
                  <p className="subtitle is-5">
                    {satellite.endpoint}
                    <span className="icon is-small ml-3">
                      <i className="far fa-copy clicky"></i>
                    </span>
                  </p>
                  {/* <hr/> */}
                </div>
                <div className="box has-text-left">
                  <h1 className="title is-4 mb-6">API Key</h1>
                  <p className="subtitle">
                    {satellite.apiKey}
                    <span className="icon is-small ml-3">
                        <i className="far fa-copy clicky"></i>
                    </span>
                    <span className="icon is-small ml-3">
                        <i className="fas fa-redo clicky"></i>
                    </span>                
                  </p>
                  {/* <hr/> */}
                </div>
                <div className="box has-text-left">
                  <div className="control has-icons-right">
                    <h1 className="title is-4">
                      Static Files
                      <span 
                        className="icon is-right dropdown-icon"
                        onClick={() => this.handleShowField('static')}
                      >
                        <i className="fas fa-angle-double-down dropdown-icon-icon"></i>
                      </span>
                    </h1>
                  </div>
                  <div
                    className={`${this.state.staticVisible ? 'is-active': 'is-hidden'}`}
                  >
                    <p className="subtitle mt-4">
                      {satellite.files ? (
                        'Currently serving static files.'
                      ) : (
                        'No static files served.'
                      )}
                      <span className="icon is-small ml-3">
                        <i className="fas fa-file-upload clicky"></i>
                      </span>
                      <span className="icon is-small ml-3">
                        <i className="fas fa-trash-alt clicky"></i>
                      </span>
                    </p>
                  </div>

                  {/* <hr/> */}
                </div>
                <div className="box has-text-left">
                  <div className="buttons is-centered">
                    <button 
                      className="button is-danger is-medium is-light is-fullwidth"
                      onClick={this.handleOpenModal}
                    >
                      Destroy Satellite
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            
          </>
        ) : (
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="box">
                <p className="subtitle">
                  You have not launched any satellites.
                </p>
              </div>
            </div>
          </div>
        )}

      </>
    );
  }
};

export default Home;