import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';

function SideNav() {
  return (
    <div className="side-nav">
      <Link to="/">Home</Link>
      <Link to="/Dashboard">Dashboard </Link>
      <Link to="/Reports">Reports</Link>
   
    </div>
  );
}

export default SideNav;