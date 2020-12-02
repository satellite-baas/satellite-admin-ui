import React, { useState } from 'react';

const Notification = ({ message, success, removeNotification }) => {
  const [showDelete, setShowDelete] = useState(true);

  const handleDeleteClose = () => {
    removeNotification();
  };

  return (
    <div className={`notification ${success ? 'is-success' : 'is-danger'}`}>
      { showDelete ? (
        <button 
          className="delete"
          onClick={handleDeleteClose}
        >
        </button>
      ) : (
        null
      )}
      {message}
    </div>
  );
};

export default Notification;