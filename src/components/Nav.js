import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Detail.css';

const Nav = () => (
  <nav className="nav">
    <Link to="/">
      <div className="Back-Button">&larr; Back</div>
    </Link>
  </nav>
);

export default Nav;
