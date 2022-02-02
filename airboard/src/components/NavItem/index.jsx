import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import './nav-item.scss';

export default function NavItem({ text, icon, link, active }) {
  return (
    <li className={classnames('nav-item', active ? 'nav-item_active' : '')}>
      <Link to={link} className="nav-item__link" target="_self">
        {icon}
        {text}
      </Link>
    </li>
  );
}
