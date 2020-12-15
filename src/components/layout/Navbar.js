import React from 'react';
import { Link } from "react-router-dom";

const NavbarHeader = () => {
  return (
      <div className="column is-one-fifth nav-container">
        <aside className="menu sidebar-nav">
          <p className="menu-label">Overview</p>
          <ul className="menu-list">
            <li>  
              <Link to="/">Home</Link>
            </li>
          </ul>
          <p className="menu-label">Schema</p>
          <ul className="menu-list">
            <li><Link to="/explorer">API Explorer</Link></li>
            <li><Link to="/schema">Schema Manager</Link></li>     
          </ul>
          <p className="menu-label">Assets</p>
          <ul className="menu-list">
            <li><Link to="/files">Static File Manager</Link></li>
          </ul>
        </aside> 
      </div>
  );
};

export default NavbarHeader;