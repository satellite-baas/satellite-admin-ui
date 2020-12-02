import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      healthy: false,
      uptime: 0,
      intervalID: null
    };
  }

  componentDidMount() {
    this.healthCheck();

    const intervalID = setInterval(() => {
      this.healthCheck();
    }, 5000);

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

  render() { 
    const { satellite } = this.props;

    return (
      <>
        { satellite ? (
          <>
            <h1 className="title is-2 has-text-left">
              {satellite.name}
              <span 
                className={`tag ${this.state.healthy ? 'is-success' : 'is-danger'} ml-4 health-tag is-medium`}
              >
                {this.state.healthy ? 'Healthy' : 'Down'}
              </span>
            </h1>
            <div className="columns is-centered is-multiline">
              <div className="column is-half">
                <div className="box has-text-left">
                  <h1 className="title is-4 mb-5">Endpoint</h1>
                  <p className="subtitle is-5">{satellite.endpoint}</p>
                  <h1 className="title is-4">API Key</h1>
                  <p className="subtitle">{satellite.apiKey}</p>
                </div>
              </div>
              <div className="column is-half">
                <div className="box has-text-left">

                </div>
              </div>
            </div>
            
          </>
        ) : (
          null
        )}

      </>
    );
  }
};

export default Home;