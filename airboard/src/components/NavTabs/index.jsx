import React from 'react';
import { useSearchParams } from 'react-router-dom';

import './nav-tabs.scss';

import NavItem from '../NavItem';

function NavTabs({ flightsType }) {
  const [params] = useSearchParams();

  return (
    <ul className="nav-tabs">
      <NavItem
        text="Departures"
        icon={<i className="nav-item__icon fas fa-plane-departure"></i>}
        link={`/departures/?${params.toString()}`}
        active={flightsType === 'departure'}
      />
      <NavItem
        text="Arrivals"
        icon={<i className="nav-item__icon fas fa-plane-arrival"></i>}
        link={`/arrivals/?${params.toString()}`}
        active={flightsType === 'arrival'}
      />
    </ul>
  );
}

export default React.memo(NavTabs);
