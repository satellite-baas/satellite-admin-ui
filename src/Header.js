import React, { useState } from 'react';

const navStyle = {
  padding: "10px 20px"
};

const Header = () => {
  return (
    <div className="header-container">
      <nav className="level" style={navStyle}>
        <div className="level-left">
          <div className="level-item">
            <p className="subtitle is-3">Satellite</p>
          </div>
          
        </div>
        <div className="level-left">
          <div className="level-item">
            <button className="button">
              Change Backend
            </button>
          </div>
          
        </div>
      </nav>
    </div>

  );
};

export default Header;