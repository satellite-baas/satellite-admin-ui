import React, { useState } from 'react';

const Header = ({ 
  satellites, 
  currentSatellite, 
  changeSatellite,
  handleLogout,
  handleNewSatellite
}) => {
  const [selectedSatellite, setSelectedSatellite] = useState(currentSatellite);
  const [newName, setNewName] = useState('');
  const [show, setShow] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleSelectChange = (e) => {
    setSelectedSatellite(e.target.value);
    changeSatellite(Number(e.target.value));
  };

  const handleOpenModal = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setNewName('');
    setShow(false);
  };

  const handleHeaderNewSatellite = () => {
    handleNewSatellite(newName);
    setShow(false);
    setNewName('');
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
      if (satellites[i].name.toLowerCase().replace(/ /g, '') === value.toLowerCase().replace(/ /g, '')) {
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
            <header className="modal-card-head">
              New Satellite
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label has-text-left">Name</label>
                <div className="control has-icons-left">
                  <input 
                    type="text"
                    className={`input ${nameError ? 'is-danger' : ''}`}
                    onChange={handleNameChange}
                    value={newName}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-astronaut"></i>
                  </span>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button 
                className="button is-info" 
                onClick={handleHeaderNewSatellite}
                disabled={nameError}
              >Create Satellite</button>
              <button className="button" onClick={handleCloseModal}>Cancel</button>
            </footer>
          </div>
          <button
            className="modal-close is-large"
            onClick={handleCloseModal}
          ></button>
        </div>
      </div>
      <nav className="level extra-level-style">
        <div className="level-left">
          <div className="level-item">
            <p className="subtitle is-3">Satellite</p>
          </div>
          <div className="level-item">
              {
                satellites.length === 0 ? (
                  null
                ) : (
                  <div className="select">
                    <select
                      value={selectedSatellite}
                      onChange={handleSelectChange}
                    >
                    {satellites.map(function(satellite, idx) {
                        return (
                          <option
                            key={idx}
                            value={satellite.id}
                          >
                            {satellite.name}
                          </option>
                        );
                      })
                      }
                    </select>
                  </div>
                )
              }
          </div>
          <div className="level-item">
            <button
              className="button is-primary"
              onClick={handleOpenModal}
            >
              Launch New Satellite
            </button>
          </div>      
        </div>
        <div className="level-right">
          <div className="level-item">
            <button
              className="button"
              onClick={handleHeaderLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>

  );
};

export default Header;