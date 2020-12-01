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
    </div>
  );
};

export default AddApiKeyButton;