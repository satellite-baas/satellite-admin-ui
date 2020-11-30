import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button } from 'react-bootstrap';

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
    <div className="content">
      <button
        className="button is-medium"
        onClick={handleOpenModal}
      >
        New API Key
      </button>
      <Modal 
        show={show} 
        onHide={handleCloseModal}
      >
        <Modal.Header 
          closeButton
        >
          <Modal.Title>Create API Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <label className="radio">
                <input 
                  type="radio" 
                  name="permissions" 
                  checked={isAdmin}
                  onChange={handleCheckAdmin}
                />
                Admin
              </label>
              <label className="radio">
                <input 
                  type="radio" 
                  name="permissions" 
                  checked={!isAdmin}
                  onChange={handleCheckClient}
                />
                Client
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button"
            variant="secondary"
            onClick={handleCloseModal}
          >
            Close
          </Button>
          <Button
            className="button is-primary"
            variant="primary"
            onClick={handleAdd}
          >
            Create API Key
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddApiKeyButton;