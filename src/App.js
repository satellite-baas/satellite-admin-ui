import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Authentication from "./components/auth/Authentication";
import PublicRoute from "./components/routes/PublicRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Dashboard from "./components/layout/Dashboard";

import "./css/App.css";
import "bulma/css/bulma.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSatellite: null,
      satellites: [],
      isLoggedIn: true,
      loading: false,
      done: null,
      loadingDestroy: false,
      doneDestroy: null,
      origin: window.location.origin,
      login: true,
    };
  }

  componentDidMount() {
    axios
      .get(`${this.state.origin}/backends`, {
        withCredentials: true,
      })
      .then((json) => {
        this.setState({
          satellites: json.data.backends,
          currentSatellite: json.data.backends[0].id,
          isLoggedIn: true,
        });

        return;
      })
      .catch((err) => {
        this.setState({
          satellites: [],
          currentSatellite: null,
        });

        return;
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoggedIn !== this.state.isLoggedIn) {
      axios
        .get(`${this.state.origin}/backends`, {
          withCredentials: true,
        })
        .then((json) => {
          this.setState({
            satellites: json.data.backends,
            currentSatellite: json.data.backends[0].id,
            isLoggedIn: true,
          });

          return;
        })
        .catch((err) => {
          this.setState({
            satellites: [],
            currentSatellite: null,
          });

          return;
        });
    }
  }

  handleisLoggedIn = (id) => {
    this.setState({ isLoggedIn: id });
  };

  handleSelectedSatelliteChange = (id) => {
    this.setState({ currentSatellite: id });
  };

  handleLogout = () => {
    fetch(`${this.state.origin}/logout`, {
      method: "POST",
    })
    .then((res) => {
      this.setState({ isLoggedIn: false });
    })
    .catch((err) => {
      this.setState({ isLoggedIn: false });
    });
  };

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  handleSignup = () => {
    this.setState({ isLoggedIn: true });
  };

  handleNewSatellite = (name) => {
    const context = this;

    this.setState({ loading: true }, () => {
      axios
        .post(
          `${this.state.origin}/backend`,
          { name },
          { withCredentials: true }
        )
        .then((json) => {
          console.log(json.data);

          if (json.status >= 400) {
            context.setState({
              loading: false,
              done: {
                type: "danger",
                msg: "Satellite could not be launched. Contact administrator.",
              },
            });

            return;
          }

          context.setState({
            loading: false,
            satellites: context.state.satellites.concat(json.data.backend),
            currentSatellite: json.data.backend.id,
            done: {
              type: "success",
              msg: "Satellite successfully launched.",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          context.setState({
            loading: false,
            done: {
              type: "danger",
              msg: "Satellite could not be launched. Contact administrator.",
            },
          });
        });
    });
  };

  handleDestroySatellite = () => {
    const context = this;
    const currentName = this.getCurrentSatellite().name;

    this.setState(
      {
        loadingDestroy: true,
      },
      () => {
        axios
          .delete(`${context.state.origin}/backend`, {
            withCredentials: true,
            data: { id: context.state.currentSatellite },
          })
          .then((res) => {
            console.log(res);

            if (res.status === 201) {
              context.setState({
                loadingDestroy: false,
                doneDestroy: {
                  type: "success",
                  msg: "Satellite successfully destroyed.",
                },
              });

              context.setState(
                {
                  satellites: context.state.satellites.filter(
                    (sat) => sat.name !== currentName
                  ),
                },
                () => {
                  if (context.state.satellites.length > 0) {
                    context.setState({
                      currentSatellite: context.state.satellites[0],
                    });
                  } else {
                    context.setState({
                      currentSatellite: null,
                    });
                  }
                }
              );

              return;
            }

            context.setState({
              loadingDestroy: false,
              doneDestroy: {
                type: "danger",
                msg: "Satellite could not be destroyed.",
              },
            });
          })
          .catch((err) => {
            console.log(err);

            context.setState({
              loadingDestroy: false,
              doneDestroy: {
                type: "danger",
                msg: "Satellite could not be destroyed.",
              },
            });
          });
      }
    );
  };

  handleClearDone = () => {
    this.setState({ done: null });
  };

  handleClearDoneDestroy = () => {
    this.setState({ doneDestroy: null });
  };

  getCurrentSatellite = () => {
    return this.state.satellites.filter(function (sat) {
      return sat.id === this.state.currentSatellite;
    }, this)[0];
  };

  render() {
    const satellite = this.getCurrentSatellite();

    return (
      <div className="App">
        <Router>
          <Switch>
            <PublicRoute
              component={Authentication}
              path="/login"
              onLogin={this.handleLogin}
              origin={this.state.origin}
              isLoggedIn={this.state.isLoggedIn}
            />
            <PublicRoute
              component={Authentication}
              path="/register"
              onSignup={this.handleSignup}
              origin={this.state.origin}
              isLoggedIn={this.state.isLoggedIn}
            />
            <ProtectedRoute
              component={Dashboard}
              path="/"
              isLoggedIn={this.state.isLoggedIn}
              satellites={this.state.satellites}
              currentSatellite={this.state.currentSatellite}
              changeSatellite={this.handleSelectedSatelliteChange}
              handleNewSatellite={this.handleNewSatellite}
              handleLogout={this.handleLogout}
              handleClearDone={this.handleClearDone}
              loading={this.state.loading}
              done={this.state.done}
              satellite={satellite}
              handleDestroySatellite={this.handleDestroySatellite}
              loadingDestroy={this.state.loadingDestroy}
              doneDestroy={this.state.doneDestroy}
              clearDone={this.handleClearDoneDestroy}
              origin={this.state.origin}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
