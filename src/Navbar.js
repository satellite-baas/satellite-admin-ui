import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Navbar, 
         Form, 
         Button, 
         Nav, 
         FormControl } from 'react-bootstrap';

const NavbarHeader = () => {
  return (
    <div className='custom-sidebar'>
      <nav className="nav-list">
        <Link to="/">Overview</Link>
        <Link to="/explorer">API Explorer</Link>
        <Link to="/schema">Schema Manager</Link>
        <Link to="/security">Security</Link>
      </nav>
    </div>   
  );
};

export default NavbarHeader;