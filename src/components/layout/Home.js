import axios from 'axios';
import React from 'react';

const iconSpanStyle = {
  height: '1em',
  width: '1em'
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      healthy: false,
      uptime: 0,
      intervalID: null,
      show: false,
      showAPI: false,
      apiVisible: false,
      endpointVisible: false
    };
  }

  componentDidMount() {
    if (!this.props.satellite) {
      return;
    }

    this.healthCheck();

    const intervalID = setInterval(() => {
      this.healthCheck();
    }, 10000);

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

    axios.get(`${this.props.origin}/health/${this.props.satellite.id}`, {
      withCredentials: true
    })
    .then(res => {
      context.setState({
        healthy: true
      })
    })
    .catch(err => {
      context.setState({
        healthy: false
      });
    });

    // fetch(`http://${this.props.satellite.name}.${DOMAIN}:5000/admin`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-API-Key': `${API_KEY}`
    //   },
    //   body: JSON.stringify({ query })
    // })
    // .then(res => res.json())
    // .then(json => {
    //   const alpha = json.data.health[json.data.health.length - 1];

    //   context.setState({
    //     healthy: alpha.status === 'healthy',
    //     uptime: alpha.uptime
    //   });
    // })
    // .catch(err => {
    //   context.setState({
    //     healthy: false,
    //     uptime: 0
    //   });
    // })
  };

  handleOpenAPIModal = () => {
    this.setState({ showAPI: true });
  };

  handleCloseAPIModal = () => {
    this.setState({ showAPI: false });
  };

  handleGetNewAPIKey = () => {
    this.props.handleNewAPIKey();
    this.handleCloseAPIModal();
  };

  handleOpenModal = () => {
    this.setState({ show: true });
  };

  handleCloseModal = () => {
    this.setState({ show: false });
    this.props.clearDone();
  };

  handleConfirmDestroy = () => {
    this.props.handleDestroySatellite();
  };

  handleShowField = (field) => {
    if (field === 'static') {
      this.setState({ staticVisible: !this.state.staticVisible });
    }

    if (field === 'api') {
      this.setState({ apiVisible: !this.state.apiVisible });
    }

    if (field === 'endpoint') {
      this.setState({ endpointVisible: !this.state.endpointVisible });
    }

    return;
  };

  handleCopy = (copyValue) => {
    navigator.clipboard.writeText(copyValue).then(() => {
      return true;
    }, () => {
      return null;
    });
  };

  render() { 
    const { satellite, loading, done } = this.props;

    return (
      <>
        <div className={`modal ${this.state.show ? "is-active" : ""}`}>
          <div className="modal-background">
            <div id="centered-modal" className="modal-card">
              <header className="modal-card-head">
                Destroy Satellite
              </header>
              {!loading && !done && (
                <>
                  <section className="modal-card-body">
                    <p className="subtitle">Are you sure you want to destroy this Satellite? This action is irreversible.</p>
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
                </>
              )}
              {loading && (
                <>
                  <section className="modal-card-body">
                    <progress
                      className="progress is-medium is-danger"
                    >
                      15%
                    </progress>
                  </section>
                  <footer className="modal-card-foot"></footer>
                </>
              )}
              {done && (
                <>
                  <section className="modal-card-body">
                    <p className="subtitle">
                      {done.msg}
                    </p>
                  </section>
                  <footer className="modal-card-foot"></footer>
                </>
              )}
            </div>
            {!loading && (
              <button
                className="modal-close is-large"
                onClick={this.handleCloseModal}
              ></button>
            )}
          </div>
        </div>
        { satellite ? (
          <>
            <div className="columns is-centered is-multiline">
              
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
                  <div className="control has-icons-right">
                    <h1 
                      className="title is-4"
                      onClick={() => this.handleShowField('endpoint')}
                    >
                      Endpoint
                      <span
                        style={iconSpanStyle}
                        className={`icon is-right ${this.state.endpointVisible ? 'is-active' : 'is-hidden'}`}
                      >
                        <i className={`fas fa-angle-double-up dropdown-icon`}></i>
                      </span>
                      <span
                        style={iconSpanStyle}
                        className={`icon is-right ${!this.state.endpointVisible ? 'is-active' : 'is-hidden'}`}
                      >
                        <i className={`fas fa-angle-double-down dropdown-icon`}></i>
                      </span>
                    </h1>
                  </div>
                  <div className={this.state.endpointVisible ? 'is-active' : 'is-hidden'}>
                    <p className="subtitle is-5 mt-4">
                      {satellite.name}
                      <span className="icon is-small ml-3">
                        <i className="far fa-copy clicky"></i>
                      </span>
                    </p>
                  </div>

                </div>
                <div className="box has-text-left">
                  <div className="control has-icons-right">
                    <h1 
                      className="title is-4" 
                      onClick={() => this.handleShowField('api')}
                    >API Key
                      <span
                        style={iconSpanStyle}
                        className={`icon is-right ${this.state.apiVisible ? 'is-active' : 'is-hidden'}`}
                      >
                        <i className={`fas fa-angle-double-up dropdown-icon`}></i>
                      </span>
                      <span
                        style={iconSpanStyle}
                        className={`icon is-right ${!this.state.apiVisible ? 'is-active' : 'is-hidden'}`}
                      >
                        <i className={`fas fa-angle-double-down dropdown-icon`}></i>
                      </span>
                    </h1>
                  </div>
                  <div className={this.state.apiVisible ? 'is-active' : 'is-hidden'}>
                    <p className="subtitle mt-4">
                      {satellite.apiKey}
                      <span 
                        className="icon is-small ml-3"
                        onClick={() => this.handleCopy(satellite.apiKey)}
                      >
                          <i className="far fa-copy clicky"></i>
                      </span>
                      <span 
                        className="icon is-small ml-3"
                        onClick={this.handleOpenAPIModal}
                      >
                          <i className="fas fa-redo clicky"></i>
                      </span>                
                    </p>
                  </div>
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