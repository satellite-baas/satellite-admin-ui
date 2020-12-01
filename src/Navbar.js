import React, { useState } from 'react';
import { Link } from "react-router-dom";

const styles = {
  textAlign: 'left',
  marginLeft: "27px",
  borderRight: "2px solid lightgray",
  height: "100vh",
  paddingTop: "20px"
};

const NavbarHeader = () => {
  return (
    <aside className="menu" style={styles}>
      <p className="menu-label">Overview</p>
      <ul className="menu-list">
        <li><Link to="/">Home</Link></li>

      </ul>
      <p className="menu-label">Schema</p>
      <ul className="menu-list">
        <li><Link to="/explorer">API Explorer</Link></li>
        <li><Link to="/schema">Schema Manager</Link></li>     
      </ul>
      <p className="menu-label">Security</p>
      <ul className="menu-list">
        <li><Link to="/security">API Key Mananger</Link></li>
      </ul>
    </aside> 
  );
};

export default NavbarHeader;