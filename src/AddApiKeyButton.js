import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddApiKeyButton = ({ addKey }) => {
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleOpenModal = (e) => {
    setShow(true);
  };

  const handleCloseModal = (e) => {
    setShow(false);
  };

  const handleAdd = (e) => {
    setShow(false);
    addKey(isAdmin);
    setIsAdmin(false);
  };

  const handleCheckAdmin = (e) => {
    setIsAdmin(true);
  };

  const handleCheckClient = (e) => {
    setIsAdmin(false);
  };

  return (
    <div>
      <button
        className="button is-fullwidth is-info mt-5"
        onClick={handleOpenModal}
      >
        New API Key
      </button>
      <div className={`modal ${show ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            New API Key
          </header>
          <section className="modal-card-body">
            <p></p>
            <div className="control">
              <label className="radio">
                <input type="radio" name="permissions" checked={isAdmin}/>
                Admin
              </label>
              <label className="radio">
                <input type="radio" name="permissions" checked={!isAdmin} />
                Client
              </label>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-info" onClick={handleAdd}>Create API Key</button>
            <button className="button" onClick={handleCloseModal}>Cancel</button>
          </footer>
        </div>
        <button 
          className="modal-close is-large" 
          onClick={handleCloseModal}
        ></button>
      </div>
    </div>
  );
};

export default AddApiKeyButton;