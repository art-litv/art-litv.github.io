import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img
          src="https://static.wikia.nocookie.net/marveldatabase/images/4/4d/Aero_Vol_1_4_Logo.png"
          className="header__logo"
        />
      </Link>
    </header>
  );
}
