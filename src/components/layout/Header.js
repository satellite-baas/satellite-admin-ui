import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Header = ({
  satellites,
  currentSatellite,
  changeSatellite,
  handleLogout,
  handleNewSatellite,
  handleClearDone,
  loading,
  done,
  origin,
}) => {
  const [selectedSatellite, setSelectedSatellite] = useState(currentSatellite);
  const [newName, setNewName] = useState("");
  const [show, setShow] = useState(false);
  const [nameError, setNameError] = useState(false);

  const clearDone = () => {
    handleClearDone();
  };

  const handleSelectChange = (e) => {
    setSelectedSatellite(e.target.value);
    changeSatellite(Number(e.target.value));
  };

  const handleOpenModal = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setNewName("");
    setShow(false);
    clearDone();
  };

  const handleHeaderNewSatellite = (e) => {
    e.preventDefault();
    handleNewSatellite(newName);
    setNewName("");
  };

  const handleHeaderLogout = () => {
    handleLogout();
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    checkForErrors(e.target.value);
  };

  const checkForErrors = (value) => {
    if (value.trim().length < value.length) {
      setNameError(true);
      return;
    }

    if (value.length === 0) {
      setNameError(true);
      return;
    }

    for (let i = 0; i < satellites.length; i += 1) {
      if (
        satellites[i].name.toLowerCase().replace(/ /g, "") ===
        value.toLowerCase().replace(/ /g, "")
      ) {
        setNameError(true);
        return;
      }
    }

    setNameError(false);
  };

  return (
    <div className="header-container">
      <div className={`modal ${show ? "is-active" : ""}`}>
        <div className="modal-background">
          <div id="centered-modal" className="modal-card">
            <header className="modal-card-head">New Satellite</header>
            <section className="modal-card-body">
              {!loading && !done && (
                <div className="field">
                  <label className="label has-text-left">Name</label>
                  <div className="control has-icons-left">
                    <input
                      type="text"
                      className={`input ${nameError ? "is-danger" : ""}`}
                      onChange={handleNameChange}
                      value={newName}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user-astronaut"></i>
                    </span>
                  </div>
                </div>
              )}
              {loading && (
                <div>
                  <p className="subtitle">Launching new Satellite...</p>
                  <progress className="progress is-medium is-primary">
                    15%
                  </progress>
                </div>
              )}
              {done && (
                <div>
                  <p className="subtitle">{done.msg}</p>
                </div>
              )}
            </section>
            {loading || done ? (
              <footer className="modal-card-foot"></footer>
            ) : (
              <footer className="modal-card-foot">
                <button
                  className="button is-info"
                  onClick={handleHeaderNewSatellite}
                  disabled={nameError}
                >
                  Create Satellite
                </button>
                <button className="button" onClick={handleCloseModal}>
                  Cancel
                </button>
              </footer>
            )}
          </div>
          <button
            className={`modal-close is-large ${
              !loading ? "is-active" : "is-hidden"
            }`}
            onClick={handleCloseModal}
          ></button>
        </div>
      </div>
      <nav className="level extra-level-style">
        <div className="level-left">
          <div className="level-item">
            <Link to="/">
                <p className="subtitle is-3">
                  <img 
                    src="/header.png" 
                    id="satellite-header"
                  />
                </p>            
              </Link>
          </div>
          <div className="level-item">
            {satellites.length === 0 ? null : (
              <div className="select">
                <select value={selectedSatellite} onChange={handleSelectChange}>
                  {satellites.map(function (satellite, idx) {
                    return (
                      <option key={idx} value={satellite.id}>
                        {satellite.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
          <div className="level-item">
            <button className="button is-primary" onClick={handleOpenModal}>
              Launch New Satellite
            </button>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <button className="button" onClick={handleHeaderLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
