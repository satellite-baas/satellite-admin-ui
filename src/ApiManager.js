import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AddApiKeyButton from './AddApiKeyButton';
import ApiKeyTable from './ApiKeyTable';

const initialState = [{
  id: 1,
  key: uuidv4(),
  admin: true
}, {
  id: 2,
  key: uuidv4(),
  admin: false
}, {
  id: 3,
  key: uuidv4(),
  admin: true
}];

const sorter = (keys) => {
  return keys.slice(0).sort((f, s) => s.admin - f.admin);
};

const ApiManager = () => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    // fetch API to get keys
    setKeys(sorter(initialState));
  }, []);
  
  const addKey = (isAdmin) => {
    // generate uuid for key
    // add to database
    // add in state

    const newKey = {
      key: uuidv4(),
      admin: isAdmin
    };

    setKeys(sorter(keys.concat(newKey)));
  };

  const deleteKey = (id) => {
    const newKeys = keys.filter(key => key.id !== id);

    // make API call to delete
    
    setKeys(newKeys);
  };

  return (
    <div>
      <h1 className="title is-2 has-text-left">API Key Manager</h1>
      <ApiKeyTable 
        keys={keys}
        deleteKey={deleteKey}
        addKey={addKey}
      />
    </div>
  );
};

export default ApiManager;