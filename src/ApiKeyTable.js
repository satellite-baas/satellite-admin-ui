import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

import './ApiKeyTable.css';

const ApiKeyTable = ({ keys, deleteKey }) => {
  const [shownKey, setShownKey] = useState(null);
  const [showDelete, setShowDelete ] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState(null);

  const handleCopyKey = (id) => {
    const key = keys.filter(key => key.id === id)[0];

    navigator.clipboard.writeText(key.key).then(() => {
      return true;
    }, () => {
      return null;
    });
  };

  const handleDelete = () => {
    setShowDelete(false);
    deleteKey(keyToDelete);
  };

  const handleOpenModal = (id) => {
    if (keys.length === 1) return null;

    setShowDelete(true);
    setKeyToDelete(id)
  };

  const handleCloseModal = (e) => {
    setShowDelete(false);
  };

  return (
    <div>
      <Modal 
        show={showDelete} 
        onHide={handleCloseModal}
      >
        <Modal.Header 
          closeButton
        >
          <Modal.Title>Delete API Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you'd like to delete this API key? This action is irreversible.</p>
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
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Table hover bordered striped>
        <thead>
          <tr>
            <th>Key</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {keys.map(function(key, i) {
            return (
              <tr key={i}>
                <td
                  id={key.id}
                  onClick={() => handleCopyKey(key.id)}
                >
                  { key.admin ? "*".repeat(key.key.length) : key.key }
                </td>
                <td>{key.admin ? "Admin" : "Client"}</td>
                <td>
                  <span>
                    <FontAwesomeIcon 
                      icon={faCopy} 
                      onClick={() => handleCopyKey(key.id)} 
                      className="action-icon"
                    />
                    <FontAwesomeIcon 
                      icon={faTrashAlt} 
                      onClick={() => handleOpenModal(key.id)}
                      className="action-icon"
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ApiKeyTable;