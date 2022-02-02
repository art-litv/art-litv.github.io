import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { stringify } from 'qs';

import { getDateParams } from '../../utils/urlParams';
import useEffectRedirect from '../../utils/hooks/useEffectRedirect';

import './main-page.scss';

import SearchForm from '../../components/SearchForm';

export default function MainPage() {
  const location = useLocation();
  const queryParams = getDateParams();
  location.pathname === '/' && useEffectRedirect('/departures/?' + stringify(queryParams), []);

  return (
    <div className="main-page">
      <SearchForm className="main-page__search-form" />
      <Outlet />
    </div>
  );
}
