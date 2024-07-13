import React from 'react';
import './TopNav.css';

function TopNav({ caseID }) {
  return (
    <div className="top-nav">
      <div className="logo">United Health Care</div>
      <div className="nav-right">
        <span>Case ID: {caseID}</span>
        <button className="btn-logoff">Logoff</button>
      </div>
    </div>
  );
}

export default TopNav;
