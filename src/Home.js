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
    return (
      <div>
        
      </div>
    );
  }
};

export default Home;